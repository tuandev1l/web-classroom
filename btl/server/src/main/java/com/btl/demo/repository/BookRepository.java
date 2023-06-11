package com.btl.demo.repository;

import com.btl.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
  @Query(value = "select * from book limit ?1,?2", nativeQuery = true)
  List<Book> findAllBookWithLimit(long skip, long limit);

  //  @Query(value = "select * from book where book.title=?1 and author=?2",
  //      nativeQuery = true)
  //  List<Book> findBookWithTitleAndAuthor(String title, String author);
}
