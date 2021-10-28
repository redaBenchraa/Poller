package com.code.poller.event;

import org.springframework.context.ApplicationEvent;

import com.code.poller.dtos.EndpointDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EndpointEvent extends ApplicationEvent {
	private String type;

	public EndpointEvent(final String type, final EndpointDto source) {
		super(source);
		this.type = type;
	}
}
