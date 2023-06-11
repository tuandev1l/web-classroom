package com.btl.demo.service;

import com.btl.demo.dtos.comment.CommentDto;
import com.btl.demo.entity.Book;
import com.btl.demo.entity.Comment;
import com.btl.demo.entity.Item;
import com.btl.demo.entity.User;
import com.btl.demo.exception.NotFoundException;
import com.btl.demo.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
  private final CommentRepository commentRepository;
  private final BookService bookService;
  private final UserService userService;
  private final ItemService itemService;
  private final OrderService orderService;

  public List<Comment> getAllCommentsOfBook(long id) {
    return this.commentRepository.getAllCommentsOfBook(id);
  }

  public Comment getComment(long id) {
    return this.commentRepository.findById(id).orElseThrow(() -> new NotFoundException("There is no comment with this ID"));
  }

  public Comment createComment(long id, CommentDto commentDto) {
    Book book = this.bookService.getBook(id);
    User user = userService.getCurrentUser();
    Item item = itemService.getItem(commentDto.getOrderId(), id);
    if (!item.getIsCommented()) {
      item.setIsCommented(true);
      Comment comment = new Comment();
      comment.setUser(user);
      comment.setBook(book);
      comment.setRate(commentDto.getRate());
      comment.setMessage(commentDto.getMessage());
      this.commentRepository.save(comment);
      item.setComment(comment);
      itemService.saveItem(item);
      return comment;
    }
    return this.updateComment(book.getId(), item.getComment().getId(),
        commentDto);
  }

  public Comment updateComment(long bookId, long commentId, CommentDto commentDto) {
    Comment comment = this.getComment(commentId);
    comment.setMessage(commentDto.getMessage());
    comment.setRate(commentDto.getRate());
    return this.commentRepository.save(comment);
  }

  public void deleteComment(long bookId, long commentId) {
    Comment comment = this.getComment(commentId);
    this.commentRepository.deleteById(commentId);
  }

}
