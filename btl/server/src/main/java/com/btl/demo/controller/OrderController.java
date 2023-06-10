package com.btl.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class OrderController {
  private final OrderService orderService;

  
}
