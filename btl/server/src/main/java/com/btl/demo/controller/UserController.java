package com.btl.demo.controller;

import com.btl.demo.entity.User;
import com.btl.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
  private final UserService userService;

  @GetMapping("/")
  public List<User> getAllUsers() {
    return this.userService.getAllUsers();
  }

  
}
