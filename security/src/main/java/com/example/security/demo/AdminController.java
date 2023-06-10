package com.example.security.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
  @GetMapping("test")
  public ResponseEntity<String> demoAdmin() {
    return ResponseEntity.ok("Hello from demo admin");
  }
}
