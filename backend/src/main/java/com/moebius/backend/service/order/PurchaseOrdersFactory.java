package com.moebius.backend.service.order;

import com.moebius.backend.domain.orders.Order;
import com.moebius.backend.domain.orders.OrderPosition;
import com.moebius.backend.domain.orders.OrderRepository;
import com.moebius.backend.domain.trades.TradeDocument;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

import static com.moebius.backend.utils.ThreadScheduler.COMPUTE;
import static com.moebius.backend.utils.ThreadScheduler.IO;

@Slf4j
@Component
@RequiredArgsConstructor
public class PurchaseOrdersFactory implements OrdersFactory {
	private final OrderRepository orderRepository;

	@Override
	public OrderPosition getPosition() {
		return OrderPosition.PURCHASE;
	}

	@Override
	public Flux<Order> getOrders(TradeDocument tradeDocument) {
		return orderRepository.findAndUpdateAllByBidCondition(tradeDocument.getExchange(), tradeDocument.getSymbol(), OrderPosition.PURCHASE, tradeDocument.getPrice())
			.subscribeOn(IO.scheduler())
			.publishOn(COMPUTE.scheduler());
	}
}