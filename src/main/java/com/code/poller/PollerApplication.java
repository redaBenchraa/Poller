package com.code.poller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PollerApplication {

	public static void main(final String[] args) {
		final SpringApplication springApplication = new SpringApplication(
				PollerApplication.class);
		springApplication.run(args);
	}

}
