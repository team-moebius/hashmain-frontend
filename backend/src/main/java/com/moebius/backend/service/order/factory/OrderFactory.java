package com.moebius.backend.service.order.factory;

import com.moebius.backend.domain.orders.Order;
import com.moebius.backend.domain.orders.OrderPosition;
import com.moebius.backend.dto.TradeDto;
import reactor.core.publisher.Flux;

public interface OrderFactory {
	OrderPosition getPosition();

	Flux<Order> getAndUpdateOrdersToDone(TradeDto tradeDto);
}
