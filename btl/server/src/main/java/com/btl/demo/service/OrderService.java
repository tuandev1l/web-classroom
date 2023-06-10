package com.btl.demo.service;

import com.btl.demo.dtos.order.OrderDto;
import com.btl.demo.entity.Item;
import com.btl.demo.entity.Order;
import com.btl.demo.entity.User;
import com.btl.demo.enums.Role;
import com.btl.demo.enums.Status;
import com.btl.demo.exception.InvalidException;
import com.btl.demo.exception.NotFoundException;
import com.btl.demo.repository.ItemRepository;
import com.btl.demo.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {
  private final OrderRepository orderRepository;
  private final UserService userService;
  private final CartService cartService;
  private final ItemRepository itemRepository;

  public List<Order> getAllOrders() {
    User user = this.userService.getCurrentUser();
    if (user.getRole().equals(Role.USER)) {
      return orderRepository.findOrderByUser(user.getId());
    }
    return orderRepository.findAll();
  }

  public Order getOrder(long id) {
    User user = this.userService.getCurrentUser();
    if (user.getRole().equals(Role.USER)) {
      return orderRepository.findOrderByIdAndUser(id, user.getId()).orElseThrow(() -> new NotFoundException(
          "There is no order with this ID"));
    }
    return orderRepository.findById(id).orElseThrow(() -> new NotFoundException(
        "There is no order with this ID"));
  }

  public Order updateOrder(long id, OrderDto orderDto) {
    Status status =
        Arrays.stream(Status.class.getEnumConstants()).filter(el -> el.toString().equals(orderDto.getStatus())).findAny().orElse(null);
    Order order = this.orderRepository.findById(id).orElseThrow();
    if (status != null) {
      order.setStatus(status);
      return this.orderRepository.save(order);
    }
    throw new InvalidException("Status is not valid");
  }

  public Order createOrder() {
    User user = this.userService.getCurrentUser();
    List<Item> items = this.cartService.getCartOfUser().getItem();
    if (items.size() > 0) {
      Order order = new Order();
      order.setUser(user);
      order.setStatus(Status.PENDING);
      order.setTotalMoney(this.cartService.calculateMoney(items));
      Random rd = new Random();
      LocalDate expected = LocalDate.now().plusDays(rd.nextInt(7));
      order.setExpectDelivered(expected);
      this.orderRepository.save(order);
      for (Item item : items) {
        item.setOrder(order);
        item.setCart(null);
      }
      this.itemRepository.saveAll(items);
      return order;
    }
    throw new NotFoundException("There is no item in your cart");
  }

  public void cancelOrder(long id) {
    Order order = this.getOrder(id);
    Status status = order.getStatus();
    if (status != Status.CANCELED && status != Status.SUCCESSFUL) {
      order.setStatus(Status.CANCELED);
      orderRepository.save(order);
      return;
    }
    throw new InvalidException("Cannot cancel canceled and successful orders");
  }

}
