package com.code.poller.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.code.poller.dtos.EndpointDto;
import com.code.poller.services.EndpointService;

@RestController
@RequestMapping(value = "services")
public class EndpointController {

	@Autowired
	private EndpointService service;

	@GetMapping()
	public List<EndpointDto> getServices() {
		return service.findAll();
	}

	@PostMapping
	public EndpointDto create(
			@RequestBody @Valid final EndpointDto endpointDto) {
		return service.create(endpointDto);
	}

	@PutMapping(value = "/{id}")
	public EndpointDto edit(@PathVariable("id") final String id,
			@RequestBody @Valid final EndpointDto endpointDto) {
		return service.edit(id, endpointDto);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable("id") final String id) {
		service.delete(id);
	}
}
