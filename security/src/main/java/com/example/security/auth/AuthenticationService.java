package com.example.security.auth;

import com.example.security.config.JwtService;
import com.example.security.user.Role;
import com.example.security.user.User;
import com.example.security.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
  private final JwtService jwtService;
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(JwtService jwtService, UserRepository repository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
    this.jwtService = jwtService;
    this.repository = repository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
  }

  public AuthenticationResponse register(RegisterRequest registerRequest) {
    User user = User.builder()
        .firstname(registerRequest.getFirstname())
        .lastname(registerRequest.getLastname())
        .email(registerRequest.getEmail())
        .password(passwordEncoder.encode(registerRequest.getPassword()))
        .role(Role.USER)
        .build();

    repository.save(user);

    String token = jwtService.generateToken(user);
    // this way equals to way below:
    AuthenticationResponse authenticationResponse = new AuthenticationResponse();
    authenticationResponse.setToken(token);
    return authenticationResponse;
  }

  public AuthenticationResponse authenticate(AuthenticateRequest request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    // to go here that means it passed authentication above
    // if email or password is not valid, it throws error
    User user =
        repository.findByEmail(request.getEmail()).orElseThrow();
    String token = jwtService.generateToken(user);
    return AuthenticationResponse.builder().token(token).build();
  }
}
