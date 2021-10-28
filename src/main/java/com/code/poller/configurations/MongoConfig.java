package com.code.poller.configurations;

import java.util.Collections;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

	@Override
	protected void configureClientSettings(
			final MongoClientSettings.Builder builder) {

		builder.credential(MongoCredential
				.createCredential("mongo", "poller", "mongo".toCharArray()))
				.applyToClusterSettings(settings -> {
					settings.hosts(Collections.singletonList(
							new ServerAddress("127.0.0.1", 27017)));
				});
	}

	@Override
	protected String getDatabaseName() {
		return "poller";
	}
}