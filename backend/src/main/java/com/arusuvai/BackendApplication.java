package com.arusuvai;

import com.arusuvai.config.RazorpayProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(
		exclude = UserDetailsServiceAutoConfiguration.class
)
@EnableConfigurationProperties(RazorpayProperties.class)
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(
				BackendApplication.class,
				args
		);
	}
}