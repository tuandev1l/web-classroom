package com.btl.demo.repository;

import com.btl.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query(value = "select * from orders where user_id = ?2 and id=?1", nativeQuery = true)
  Optional<Order> findOrderByIdAndUser(long id, long userId);

  @Query(value = "select * from orders where user_id = ?1", nativeQuery = true)
  List<Order> findOrderByUser(long id);
}
