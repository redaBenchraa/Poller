package com.code.poller.tasks;

import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.code.poller.constants.EventType;
import com.code.poller.dtos.EndpointDto;
import com.code.poller.event.EndpointEvent;
import com.code.poller.repositories.EndpointRepository;
import com.code.poller.services.EventCastService;

@Component
public class SchedulePing {

	@Autowired
	private EndpointRepository repository;

	@Autowired
	private EventCastService eventCastService;

	public static boolean isAlive(final String url) {
		try {
			final URL siteURL = new URL(url);
			final HttpURLConnection connection = (HttpURLConnection) siteURL
					.openConnection();
			connection.setRequestMethod("GET");
			connection.setConnectTimeout(3000);
			connection.connect();
			return connection.getResponseCode() == 200;
		} catch (final Exception e) {
			return false;
		}
	}

	@Scheduled(fixedDelay = 3000)
	public void ping() {
		repository.findAll().parallelStream().forEach(endpoint -> {
			final var isAlive = isAlive(endpoint.getUrl());
			if (endpoint.isAlive() != isAlive) {
				endpoint.setAlive(isAlive);
				repository.save(endpoint);
				eventCastService.onNext(new EndpointEvent(EventType.edit.name(),
						new EndpointDto(endpoint)));
			}
		});
	}
}
