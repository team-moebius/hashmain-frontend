package com.moebius.backend.assembler.order;

import com.moebius.backend.domain.orders.OrderStatus;
import com.moebius.backend.dto.OrderAssetDto;
import com.moebius.backend.dto.OrderDto;
import com.moebius.backend.dto.exchange.AssetDto;
import com.moebius.backend.dto.frontend.response.OrderAssetResponseDto;
import com.moebius.backend.utils.OrderUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.util.Precision;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OrderAssetAssembler {
	private final OrderUtil orderUtil;

	public Map<String, List<OrderDto>> toCurrencyOrderDtosMap(List<OrderDto> orders) {
		Map<String, List<OrderDto>> currencyOrdersMap = new HashMap<>();

		orders.forEach(order ->
			currencyOrdersMap.compute(orderUtil.getCurrencyBySymbol(order.getSymbol()),
				(currency, sameCurrencyOrders) -> {
					if (sameCurrencyOrders == null) {
						List<OrderDto> newCurrencyOrders = new ArrayList<>();
						newCurrencyOrders.add(order);
						return newCurrencyOrders;
					}
					sameCurrencyOrders.add(order);
					return sameCurrencyOrders;
				}));

		return currencyOrdersMap;
	}

	public OrderAssetDto toOrderAssetDto(List<OrderDto> orders, AssetDto asset, double currentPrice) {
		if (asset == null || currentPrice == 0D) {
			return OrderAssetDto.builder()
				.currency(orderUtil.getCurrencyBySymbol(orders.get(0).getSymbol()))
				.orderStatus(identifyOrderStatus(orders))
				.build();
		}
		return OrderAssetDto.builder()
			.currency(orderUtil.getCurrencyBySymbol(orders.get(0).getSymbol()))
			.averagePurchasePrice(asset.getAveragePurchasePrice())
			.balance(asset.getBalance())
			.tradePrice(asset.getAveragePurchasePrice() * asset.getBalance())
			.evaluatedPrice(currentPrice * asset.getBalance())
			.profitLossRatio(Precision.round(currentPrice / asset.getAveragePurchasePrice() - 1, 4) * 100)
			.orderStatus(identifyOrderStatus(orders))
			.build();

	}

	public OrderAssetResponseDto toStatusResponseDto(List<OrderAssetDto> orderStatuses) {
		return OrderAssetResponseDto.builder()
			.orderStatuses(orderStatuses)
			.build();
	}

	private OrderStatus identifyOrderStatus(List<OrderDto> orders) {
		return hasInProgressStatus(orders) ? OrderStatus.IN_PROGRESS : OrderStatus.READY;
	}

	private boolean hasInProgressStatus(List<OrderDto> orders) {
		return orders.stream().anyMatch(order -> order.getOrderStatus() == OrderStatus.IN_PROGRESS);
	}
}
