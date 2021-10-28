package com.code.poller.handlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;

import com.code.poller.services.EventCastService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class DefaultWebSocketHandler implements WebSocketHandler {

	@Autowired
	EventCastService eventCastService;

	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public Mono<Void> handle(final WebSocketSession session) {
		final Flux<WebSocketMessage> messages = session.receive()
				.flatMap(message -> eventCastService.getMessages())
				.flatMap(o -> {
					try {
						return Mono.just(objectMapper.writeValueAsString(o));
					} catch (final JsonProcessingException e) {
						return Mono.error(e);
					}
				}).map(session::textMessage);
		return session.send(messages);
	}
}