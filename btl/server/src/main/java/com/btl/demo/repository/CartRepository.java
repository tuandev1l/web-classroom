package com.btl.demo.repository;

import com.btl.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
  @Query(value = "select * from cart where user_id = ?1 ", nativeQuery = true)
  Optional<Cart> getCartByUser(long id);
}
