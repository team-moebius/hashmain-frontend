package com.moebius.app;

import com.moebius.backend.BackendContextLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ClientHttpConnector;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@ComponentScan(basePackageClasses = BackendContextLoader.class)
public class AppContextLoader {
	@Bean
	public WebClient webClient() {
		ClientHttpConnector connector = new ReactorClientHttpConnector();

		return WebClient.builder().clientConnector(connector).build();
	}
}