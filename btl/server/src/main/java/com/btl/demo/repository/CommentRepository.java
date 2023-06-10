package com.btl.demo.repository;

import com.btl.demo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
  @Query(value = "select * from comment where book_id=?", nativeQuery = true)
  List<Comment> getAllCommentsOfBook(Long id);
}
