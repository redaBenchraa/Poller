package com.code.poller.services;

import static java.util.Objects.isNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.code.poller.constants.EventType;
import com.code.poller.dtos.EndpointDto;
import com.code.poller.event.EndpointEvent;
import com.code.poller.repositories.EndpointRepository;

@Service
public class EndpointService {

	@Autowired
	EndpointRepository repository;

	@Autowired
	private EventCastService eventCastService;

	public List<EndpointDto> findAll() {
		return repository.findAll().stream().map(EndpointDto::new)
				.collect(Collectors.toList());
	}

	public EndpointDto create(final EndpointDto endpoint) {
		endpoint.setCreationTime(LocalDateTime.now());
		final var result = new EndpointDto(
				repository.insert(endpoint.toEntity()));
		this.eventCastService
				.onNext(new EndpointEvent(EventType.create.name(), result));
		return result;
	}

	public void delete(final String id) {
		final var entity = repository.findById(id).orElse(null);
		if (isNull(entity)) {
			throw new RuntimeException();
		}
		repository.deleteById(id);
		this.eventCastService.onNext(new EndpointEvent(EventType.delete.name(),
				new EndpointDto(entity)));
	}

	public EndpointDto edit(final String id, final EndpointDto endpoint) {
		final var entity = repository.findById(id).orElse(null);
		if (isNull(entity)) {
			throw new RuntimeException();
		}
		entity.setName(endpoint.getName());
		entity.setUrl(endpoint.getUrl());
		final var result = new EndpointDto(repository.save(entity));
		this.eventCastService
				.onNext(new EndpointEvent(EventType.edit.name(), result));
		return result;
	}
}
