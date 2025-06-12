package com.orchestrea.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = "file:.env", ignoreResourceNotFound = true)
public class DotenvConfig {
    // Spring injecte automatiquement les variables dans les @Value(...)
}
