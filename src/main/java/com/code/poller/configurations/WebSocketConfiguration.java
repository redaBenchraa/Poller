package com.code.poller.configurations;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerAdapter;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;

@Configuration
class WebSocketConfiguration {

	@Autowired
	private WebSocketHandler webSocketHandler;

	@Bean
	public HandlerAdapter wsHandlerAdapter() {
		return new WebSocketHandlerAdapter();
	}

	@Bean
	public HandlerMapping handlerMapping() {
		final String path = "/services/events";
		final Map<String, WebSocketHandler> map = Map.of(path,
				webSocketHandler);
		return new SimpleUrlHandlerMapping(map, -1);
	}
}