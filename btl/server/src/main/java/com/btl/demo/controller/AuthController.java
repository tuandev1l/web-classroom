package com.btl.demo.controller;

import com.btl.demo.auth.AuthResponse;
import com.btl.demo.dtos.user.LoginDto;
import com.btl.demo.dtos.user.SignupDto;
import com.btl.demo.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @PostMapping("/signup")
  public AuthResponse signup(
      @Valid @RequestBody SignupDto request
  ) {
    return authService.signup(request);
  }

  @PostMapping("/login")
  public AuthResponse login(
      @Valid @RequestBody LoginDto request
  ) {
    return authService.login(request);
  }

}
