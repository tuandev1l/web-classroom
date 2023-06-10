package com.btl.demo.controller;

import com.btl.demo.dtos.item.ItemDto;
import com.btl.demo.entity.Cart;
import com.btl.demo.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
  private final CartService cartService;

  @GetMapping("")
  public Cart getCart() {
    return this.cartService.getCartOfUser();
  }

  @PostMapping("")
  public void addItemToCart(@Valid @RequestBody ItemDto itemDto) {
    this.cartService.addItemToCart(itemDto);
  }

  @PostMapping("/reset")
  public Cart resetCart() {
    return this.cartService.resetCart();
  }

  @PatchMapping("")
  public void updateItemInCart(@Valid @RequestBody ItemDto itemDto) {
    this.cartService.updateItemInCart(itemDto);
  }

  @DeleteMapping("/{id}")
  public void deleteItemInCart(@Valid @PathVariable Long id) {
    this.cartService.deleteItemInCart(id);
  }
}
