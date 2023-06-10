package com.btl.demo.service;

import com.btl.demo.entity.Item;
import com.btl.demo.exception.NotFoundException;
import com.btl.demo.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {
  private final ItemRepository itemRepository;

  public Item getItem(long orderId, long bookId) {
    return this.itemRepository.findByOrderAndBook(orderId, bookId).orElseThrow(() -> new NotFoundException("There is no item"));
  }

  public void saveItem(Item item) {
    this.itemRepository.save(item);
  }

}
