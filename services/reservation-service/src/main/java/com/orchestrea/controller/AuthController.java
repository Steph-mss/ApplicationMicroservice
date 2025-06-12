package com.orchestrea.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.orchestrea.configuration.JwtUtils;
import com.orchestrea.repository.UserRepository;
import com.orchestrea.security.UserDetailsImpl;
import com.orchestrea.service.CaptchaService;
import com.orchestrea.payload.LoginRequest;
import com.orchestrea.payload.SignupRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.Map;
import com.orchestrea.entity.User;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CaptchaService captchaService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest req, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userDetails.getUserEntity();

        // 🔐 Créer un cookie HttpOnly sécurisé
        Cookie cookie = new Cookie("token", jwt);
        cookie.setHttpOnly(true);
        // cookie.setSecure(true); // true = HTTPS uniquement
        cookie.setSecure(false); // false = HTTP uniquement (pour le développement local)

        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60); // 1 jour
        response.addCookie(cookie);

        return ResponseEntity.ok(user); // Le token n’est plus retourné dans le corps
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest req) {
        if (!captchaService.verifyCaptcha(req.getCaptchaToken())) {
            return ResponseEntity.badRequest().body("Captcha verification failed");
        }

        if (userRepository.existsByUsername(req.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setMail(req.getMail());
        user.setPhone(req.getPhone());
        user.setRole("ROLE_USER");

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));

    }

    // 🚪 Déconnexion : suppression du cookie
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        // cookie.setSecure(true);// true = HTTPS uniquement
        cookie.setSecure(false); // false = HTTP uniquement (pour le développement local)
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immédiatement
        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return ResponseEntity.ok(userDetails.getUserEntity()); // ou créer un DTO
    }
}
