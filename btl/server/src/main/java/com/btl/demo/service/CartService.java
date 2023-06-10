package com.btl.demo.service;

import com.btl.demo.dtos.item.ItemDto;
import com.btl.demo.entity.Book;
import com.btl.demo.entity.Cart;
import com.btl.demo.entity.Item;
import com.btl.demo.entity.User;
import com.btl.demo.repository.CartRepository;
import com.btl.demo.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Service
public class CartService {
  private final CartRepository cartRepository;
  private final ItemRepository itemRepository;
  private final UserService userService;
  private final BookService bookService;

  public Cart getCartOfUser() {
    User user = userService.getCurrentUser();
    Cart cart = this.cartRepository.getCartByUser(user.getId()).orElse(null);
    if (cart == null) {
      return this.createCart();
    }
    cart.setTotalMoney(this.calculateMoney(cart.getItem()));
    return cart;
  }

  public Cart createCart() {
    User user = userService.getCurrentUser();
    Cart cart = new Cart();
    cart.setUser(user);
    List<Item> items = new ArrayList<>();
    cart.setItem(items);
    return this.cartRepository.save(cart);
  }

  public Cart resetCart() {
    Cart cart = this.getCartOfUser();
    List<Item> items = new ArrayList<>();
    cart.setItem(null);
    cart.setTotalMoney(0);
    cart.setItem(items);
    return this.cartRepository.save(cart);
  }

  public float calculateMoney(List<Item> items) {
    float totalMoney = 0;
    for (Item item : items) {
      float money = item.getBook().getMoney() * item.getQuantity();
      totalMoney += money;
    }
    return totalMoney;
  }

  public void addItemToCart(ItemDto itemDto) {
    Book book = this.bookService.getBook(itemDto.getBookId());
    Cart cart = this.getCartOfUser();
    Optional<Item> optionalItem =
        this.itemRepository.findByCartAndBook(cart.getId(),
            book.getId());
    Item item;
    if (optionalItem.isPresent()) {
      item = optionalItem.get();
      item.setQuantity(item.getQuantity() + itemDto.getQuantity());
    } else {
      item = new Item();
      item.setBook(book);
      item.setQuantity(itemDto.getQuantity());
      item.setCart(cart);
    }
    this.itemRepository.save(item);
  }

  public void updateItemInCart(ItemDto itemDto) {
    Book book = this.bookService.getBook(itemDto.getBookId());
    Cart cart = this.getCartOfUser();
    Optional<Item> optionalItem =
        this.itemRepository.findByCartAndBook(cart.getId(),
            book.getId());
    if (optionalItem.isPresent()) {
      Item item = optionalItem.get();
      if (itemDto.getQuantity() != 0) {
        item.setQuantity(itemDto.getQuantity());
        this.itemRepository.save(item);
      } else {
        this.itemRepository.deleteById(item.getId());
      }
    }
  }

  public void deleteItemInCart(long id) {
    Book book = this.bookService.getBook(id);
    Cart cart = this.getCartOfUser();
    Optional<Item> optionalItem =
        this.itemRepository.findByCartAndBook(cart.getId(),
            book.getId());
    if (optionalItem.isPresent()) {
      Item item = optionalItem.get();
      this.itemRepository.deleteById(item.getId());
    }
  }

}
