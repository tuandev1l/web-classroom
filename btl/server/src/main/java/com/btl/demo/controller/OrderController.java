package com.btl.demo.controller;

import com.btl.demo.customAnnotation.Permission;
import com.btl.demo.dtos.order.OrderDto;
import com.btl.demo.entity.Order;
import com.btl.demo.service.OrderService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
@Slf4j
public class OrderController {
  private final OrderService orderService;

  @GetMapping("")
  public List<Order> getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @GetMapping("/{id}")
  public Order getOrder(@Valid @PathVariable Long id) {
    return this.orderService.getOrder(id);
  }

  @PostMapping("")
  public Order createOrder() {
    return this.orderService.createOrder();
  }

  @PatchMapping("/{id}")
  @Permission
  public Order updateOrder(@Valid @PathVariable @Positive Long id,
                           @RequestBody OrderDto orderDto) {
    return this.orderService.updateOrder(id, orderDto);
  }

  @PatchMapping("/{id}/cancel")
  public void cancelOrder(@Valid @PathVariable @Positive Long id) {
    this.orderService.cancelOrder(id);
  }

}
