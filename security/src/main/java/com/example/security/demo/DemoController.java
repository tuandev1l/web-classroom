package com.example.security.demo;

import com.example.security.errors.NotFoundPhoneException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo")
public class DemoController {

  @GetMapping("")
  public String demo() {
    throw new NotFoundPhoneException("test");
  }
}
