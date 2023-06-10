package com.btl.demo.repository;

import com.btl.demo.entity.BookType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TypeRepository extends JpaRepository<BookType, Long> {
  @Query(value = "select * from booktype where name = ?1", nativeQuery = true)
  BookType getBookTypeByName(String booktype);
}
