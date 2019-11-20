package com.moebius.backend.service.order;

import com.moebius.backend.assembler.OrderAssembler;
import com.moebius.backend.domain.apikeys.ApiKey;
import com.moebius.backend.domain.commons.EventType;
import com.moebius.backend.domain.commons.Exchange;
import com.moebius.backend.domain.orders.Order;
import com.moebius.backend.domain.orders.OrderRepository;
import com.moebius.backend.dto.AssetsDto;
import com.moebius.backend.dto.OrderDto;
import com.moebius.backend.dto.frontend.response.OrderResponseDto;
import com.moebius.backend.exception.DataNotFoundException;
import com.moebius.backend.exception.ExceptionTypes;
import com.moebius.backend.service.exchange.ExchangeServiceFactory;
import com.moebius.backend.service.member.ApiKeyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

import static com.moebius.backend.domain.commons.EventType.DELETE;
import static com.moebius.backend.utils.ThreadScheduler.COMPUTE;
import static com.moebius.backend.utils.ThreadScheduler.IO;

@Slf4j
@Service
@RequiredArgsConstructor
public class InternalOrderService {
	private final OrderRepository orderRepository;
	private final OrderAssembler orderAssembler;
	private final ApiKeyService apiKeyService;
	private final ExchangeServiceFactory exchangeServiceFactory;

	public Mono<ResponseEntity<OrderResponseDto>> processOrders(String memberId, Exchange exchange, List<OrderDto> orderDtos) {
		return apiKeyService.getApiKeyByMemberIdAndExchange(memberId, exchange)
			.subscribeOn(COMPUTE.scheduler())
			.flatMapIterable(apiKey -> orderDtos.stream()
				.map(orderDto -> processOrder(apiKey, orderDto))
				.collect(Collectors.toList()))
			.collectList()
			.map(ordersDto -> orderAssembler.toResponseDto(ordersDto, null))
			.map(ResponseEntity::ok);
	}

	public Mono<ResponseEntity<OrderResponseDto>> getOrdersAndAssetsByMemberIdAndExchange(String memberId, Exchange exchange) {
		return Mono.zip(getOrdersByMemberIdAndExchange(memberId, exchange), getAssetsByMemberIdAndExchange(memberId, exchange))
			.subscribeOn(COMPUTE.scheduler())
			.map(tuple -> orderAssembler.toResponseDto(tuple.getT1(), tuple.getT2()))
			.map(ResponseEntity::ok);
	}

	private Mono<List<OrderDto>> getOrdersByMemberIdAndExchange(String memberId, Exchange exchange) {
		return apiKeyService.getApiKeyByMemberIdAndExchange(memberId, exchange)
			.map(apiKey -> orderRepository.findAllByApiKeyId(apiKey.getId()))
			.subscribeOn(IO.scheduler())
			.publishOn(COMPUTE.scheduler())
			.switchIfEmpty(Mono.defer(() -> Mono.error(new DataNotFoundException(
				ExceptionTypes.NONEXISTENT_DATA.getMessage("[Order] order information based on memberId(" + memberId + ")")))))
			.flatMap(orderFlux -> orderFlux.map(order -> orderAssembler.toDto(order, EventType.READ))
				.collectList());
	}

	private Mono<AssetsDto> getAssetsByMemberIdAndExchange(String memberId, Exchange exchange) {
		return apiKeyService.getExchangeAuthToken(memberId, exchange)
			.flatMap(authToken -> exchangeServiceFactory.getService(exchange)
				.getAssets(authToken))
			.subscribeOn(COMPUTE.scheduler());
	}

	private OrderDto processOrder(ApiKey apiKey, OrderDto orderDto) {
		EventType eventType = orderDto.getEventType();
		if (eventType == DELETE) {
			deleteOrder(orderDto.getId()).subscribe();
			return orderAssembler.toSimpleDto(orderDto.getId(), DELETE);
		}

		Order order = orderAssembler.toOrder(apiKey, orderDto);
		upsertOrder(order).subscribe();
		return orderAssembler.toDto(order, eventType);
	}

	private Mono<Order> upsertOrder(Order order) {
		return orderRepository.save(order)
			.subscribeOn(IO.scheduler())
			.publishOn(COMPUTE.scheduler());
	}

	private Mono<Void> deleteOrder(String id) {
		return orderRepository.deleteById(new ObjectId(id))
			.subscribeOn(IO.scheduler())
			.publishOn(COMPUTE.scheduler());
	}
}