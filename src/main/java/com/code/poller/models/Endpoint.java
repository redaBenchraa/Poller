package com.code.poller.models;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document
public class Endpoint {
	@Id
	private String id;
	private String url;
	private String name;
	private LocalDateTime creationTime;
	private boolean isAlive;
}
