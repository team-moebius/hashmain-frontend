package com.moebius.backend.domain.orders;

import com.moebius.backend.domain.commons.Exchange;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface OrderRepository extends ReactiveMongoRepository<Order, ObjectId> {
	Flux<Order> findAllByApiKeyId(ObjectId apiKeyId);

	Flux<Order> findAllByExchangeAndSymbol(Exchange exchange, String symbol);
}
