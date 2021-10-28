package com.code.poller.services;

import org.springframework.stereotype.Service;

import com.code.poller.event.EndpointEvent;

import reactor.core.publisher.EmitterProcessor;
import reactor.core.publisher.Flux;

@Service
public class EventCastService {
	private final EmitterProcessor<EndpointEvent> processor = EmitterProcessor
			.create();

	public void onNext(final EndpointEvent next) {
		processor.onNext(next);
	}

	public Flux<EndpointEvent> getMessages() {
		return processor.publish().autoConnect();
	}
}
