package com.code.poller.dtos;

import static java.util.Objects.nonNull;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.URL;

import com.code.poller.models.Endpoint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class EndpointDto {
	private String id;
	@NotNull
	@NotEmpty
	@URL
	private String url;
	@NotNull
	@NotEmpty
	private String name;
	private LocalDateTime creationTime;
	private boolean isAlive;

	public EndpointDto(final Endpoint endpoint) {
		id = endpoint.getId();
		url = endpoint.getUrl();
		name = endpoint.getName();
		creationTime = endpoint.getCreationTime();
		isAlive = endpoint.isAlive();
	}

	public Endpoint toEntity() {
		return Endpoint.builder().id(id).url(url).name(name).isAlive(isAlive)
				.creationTime(nonNull(creationTime) ? creationTime
						: LocalDateTime.now())
				.build();
	}
}
