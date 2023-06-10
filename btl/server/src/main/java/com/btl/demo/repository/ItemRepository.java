package com.btl.demo.repository;

import com.btl.demo.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
  @Query(value = "select * from item where cart_id=?1 and book_id=?2",
      nativeQuery = true)
  Optional<Item> findByCartAndBook(long cartId, long bookId);

  @Query(value = "select * from item where order_id=?1 and book_id=?2",
      nativeQuery = true)
  Optional<Item> findByOrderAndBook(long orderId, long bookId);
}
