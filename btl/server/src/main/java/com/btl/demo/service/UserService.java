package com.btl.demo.service;

import com.btl.demo.entity.User;
import com.btl.demo.exception.NotFoundException;
import com.btl.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
  private final UserRepository userRepository;

  public List<User> getAllUsers() {
    return this.userRepository.findAll();
  }

  public User getUser(long id) {
    return this.userRepository.findById(id).orElseThrow(() -> new NotFoundException("There is no user with this ID"));
  }

  public User getUserByEmail(String email) {
    return this.userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("There is no user with this Email"));
  }

  public User getCurrentUser() {
    Authentication authentication =
        SecurityContextHolder.getContext().getAuthentication();
    return this.getUser(((User) authentication.getPrincipal()).getId());
  }
}
