package com.btl.demo.auth;

import com.btl.demo.config.JwtService;
import com.btl.demo.dtos.user.LoginDto;
import com.btl.demo.dtos.user.RegisterDto;
import com.btl.demo.entity.User;
import com.btl.demo.enums.Role;
import com.btl.demo.repository.UserRepository;
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

  public AuthenticationResponse register(LoginDto loginDto) {
    User user = User.builder()
        .firstname(loginDto.getFirstname())
        .lastname(loginDto.getLastname())
        .email(loginDto.getEmail())
        .password(passwordEncoder.encode(loginDto.getPassword()))
        .role(Role.USER)
        .build();

    repository.save(user);

    String token = jwtService.generateToken(user);
    // this way equals to way below:
    AuthenticationResponse authenticationResponse = new AuthenticationResponse();
    authenticationResponse.setToken(token);
    return authenticationResponse;
  }

  public AuthenticationResponse authenticate(RegisterDto request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    // to go here that means it passed authentication above
    // if email or password is not valid, it throws error
    User user =
        repository.findByEmail(request.getEmail()).orElseThrow();
    String token = jwtService.generateToken(user);
    return AuthenticationResponse.builder().token(token).build();
  }
}
