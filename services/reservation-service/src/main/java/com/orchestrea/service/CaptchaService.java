package com.orchestrea.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Service
public class CaptchaService {
    private static final String VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    private static final String SECRET = "6LegVSorAAAAAPny1s2Q87kfT1rwpLqxRyjZFCDV";

    public boolean verifyCaptcha(String token) {
        RestTemplate restTemplate = new RestTemplate();
        String url = VERIFY_URL + "?secret=" + SECRET + "&response=" + token;

        ResponseEntity<Map> response = restTemplate.postForEntity(url, null, Map.class);
        Map<?, ?> body = response.getBody();

        return body != null && Boolean.TRUE.equals(body.get("success"));
    }
}
