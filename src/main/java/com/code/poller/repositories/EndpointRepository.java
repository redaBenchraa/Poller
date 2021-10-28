package com.code.poller.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.code.poller.models.Endpoint;

@Repository
public interface EndpointRepository extends MongoRepository<Endpoint, String> {
}
