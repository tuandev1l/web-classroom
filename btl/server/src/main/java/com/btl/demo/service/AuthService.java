package com.btl.demo.service;

import com.btl.demo.auth.AuthResponse;
import com.btl.demo.config.JwtService;
import com.btl.demo.dtos.user.LoginDto;
import com.btl.demo.dtos.user.SignupDto;
import com.btl.demo.entity.User;
import com.btl.demo.enums.Role;
import com.btl.demo.exception.DuplicatedException;
import com.btl.demo.exception.InvalidException;
import com.btl.demo.exception.NotFoundException;
import com.btl.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final JwtService jwtService;
  private final UserRepository repository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthResponse signup(SignupDto loginDto) {
    Optional<User> user = this.repository.findByEmail(loginDto.getEmail());
    if (user.isPresent()) {
      throw new DuplicatedException("This email has been taken");
    }

    if (!loginDto.getPasswordConfirm().equals(loginDto.getPassword())) {
      throw new InvalidException("Password and password confirm must be equal");
    }

    User newUser = User.builder()
        .name(loginDto.getName())
        .email(loginDto.getEmail())
        .password(passwordEncoder.encode(loginDto.getPassword()))
        .role(Role.USER)
        .build();

    repository.save(newUser);

    String token = jwtService.generateToken(newUser);
    return new AuthResponse(token, newUser.getName(), newUser.getRole().toString());
  }

  public AuthResponse login(LoginDto request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    // to go here that means it passed authentication above
    // if email or password is not valid, it throws error
    User user =
        repository.findByEmail(request.getEmail()).orElseThrow(() -> new NotFoundException("There is no user with this data"));
    String token = jwtService.generateToken(user);
    return new AuthResponse(token, user.getName(), user.getRole().toString());
  }

  @Bean
  public void createDefaultAccount() {
    if (repository.findAll().size() == 0) {
      User admin = new User(null, "admin", "admin@gmail.com", "159 Phùng Khoang, Trung Văn, Hà Đông, Hà Nội",
          passwordEncoder.encode("123456aA!"), null, Role.ADMIN,
          null, null, null);
      User user = new User(null, "tuantm", "tuantm@gmail.com", "159 Phùng Khoang, Trung Văn, Hà Đông, Hà Nội",
          passwordEncoder.encode("123456aA!"), null, Role.USER, null, null, null);
      this.repository.saveAll(List.of(admin, user));
      User user1 = new User(null, "tuantm1", "tuantm1@gmail.com", "159 Phùng Khoang, Trung Văn, Hà Đông, Hà Nội",
          passwordEncoder.encode("123456aA!"), null, Role.USER, null, null, null);
      this.repository.saveAll(List.of(admin, user1));
    }
  }
}
