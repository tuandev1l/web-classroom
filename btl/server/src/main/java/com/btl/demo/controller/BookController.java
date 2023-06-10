package com.btl.demo.controller;

import com.btl.demo.customAnnotation.Permission;
import com.btl.demo.dtos.book.BookDto;
import com.btl.demo.dtos.comment.CommentDto;
import com.btl.demo.entity.Book;
import com.btl.demo.entity.Comment;
import com.btl.demo.exception.NotFoundException;
import com.btl.demo.exception.PermissionException;
import com.btl.demo.service.BookService;
import com.btl.demo.service.CommentService;
import com.btl.demo.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/books")
@Validated
public class BookController {
  private final BookService bookService;
  private final CommentService commentService;
  private final UserService userService;

  @GetMapping("")
  public List<Book> getAllBook(@Valid @RequestParam("limit") Long limit,
                               @Valid @RequestParam("page") Long page) {
    return this.bookService.getAllBooksWithLimit(limit, page);
  }

  @GetMapping("/book-length")
  public int getBookLength() {
    return this.bookService.getAllBooks().size();
  }

  @GetMapping("/{id}")
  public Book getBook(@Valid @PathVariable("id") @Positive Long id) {
    return this.bookService.getBook(id);
  }

  @PostMapping("")
  @Permission
  public Book createBook(@Valid @RequestBody BookDto bookDto) {
    return this.bookService.createBook(bookDto);
  }

  @PatchMapping("/{id}")
  @Permission
  public Book updateBook(@Valid @PathVariable @Positive long id,
                         @Valid @RequestBody BookDto bookDto) {
    return this.bookService.updateBook(id, bookDto);
  }

  @DeleteMapping("/{id}")
  @Permission
  public void deleteBook(@Valid @PathVariable @Positive long id) {
    this.bookService.deleteBook(id);
  }

  @GetMapping("/{id}/comments")
  public List<Comment> getAllComments(@Valid @PathVariable("id") @Positive long id) {
    return this.commentService.getAllCommentsOfBook(id);
  }

  @PostMapping("/{id}/comments")
  public Comment createComment(@Valid @PathVariable("id") @Positive long id,
                               @Valid @RequestBody CommentDto commentDto) {
    return this.commentService.createComment(id, commentDto);
  }

  // todo: comment must be belong to user, belong to book -> action
  // done
  @PatchMapping("/{bookId}/comments/{commentId}")
  public Comment updateComment(@Valid @PathVariable("bookId") @Positive long bookId,
                               @Valid @PathVariable("commentId") @Positive long commentId,
                               @Valid @RequestBody CommentDto commentDto) {
    Comment comment = this.commentService.getComment(commentId);
    if (comment.getUser().getId() == this.userService.getCurrentUser().getId()) {
      return this.commentService.updateComment(bookId, commentId, commentDto);
    }
    throw new PermissionException("Can not update this comment");
  }

  @DeleteMapping("/{bookId}/comments/{commentId}")
  public void deleteComment(@Valid @PathVariable("bookId") @Positive long bookId,
                            @Valid @PathVariable("commentId") @Positive long commentId) {
    Comment comment = this.commentService.getComment(commentId);
    if (comment.getUser().getId() == this.userService.getCurrentUser().getId()) {
      this.commentService.deleteComment(bookId, commentId);
    }
    throw new NotFoundException("Can not delete this comment");
  }

}
