package com.btl.demo.service;

import com.btl.demo.dtos.book.BookDto;
import com.btl.demo.entity.Book;
import com.btl.demo.entity.BookType;
import com.btl.demo.exception.NotFoundException;
import com.btl.demo.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
  private final BookRepository bookRepository;
  private final TypeService typeService;

  public List<Book> getAllBooks() {
    return this.bookRepository.findAll();
  }

  public List<Book> getAllBooksWithLimit(long limit, long page) {
    long skip = (page - 1) * limit;
    return this.bookRepository.findAllBookWithLimit(skip, limit);
  }

  public Book getBook(long id) {
    return this.bookRepository.findById(id).orElseThrow(() -> new NotFoundException(
        "There is no book with this ID"));
  }

  public Book saveBook(Book book) {
    return this.bookRepository.save(book);
  }

  public Book createBook(BookDto bookDto) {
    //    List<Book> books =
    //        this.bookRepository.findBookWithTitleAndAuthor(bookDto.getTitle(),
    //            bookDto.getAuthor());
    //
    //    if (books.size() > 0) {
    //      throw new InvalidException("This book has been existed");
    //    }

    BookType type = typeService.getBookType(bookDto.getType());

    Book book = new Book();
    book.setAuthor(bookDto.getAuthor());
    book.setNumberOfPages(bookDto.getNumberOfPages());
    book.setPublished(bookDto.getPublished());
    book.setTitle(bookDto.getTitle());
    book.setType(type);
    book.setDescription(bookDto.getDescription());

    return this.bookRepository.save(book);
  }

  public Book updateBook(long id, BookDto bookDto) {
    BookType type = typeService.getBookType(bookDto.getType());

    Book book = this.getBook(id);
    book.setAuthor(bookDto.getAuthor());
    book.setNumberOfPages(bookDto.getNumberOfPages());
    book.setPublished(bookDto.getPublished());
    book.setTitle(bookDto.getTitle());
    book.setType(type);

    return this.bookRepository.save(book);
  }

  public void deleteBook(long id) {
    Book book = this.getBook(id);
    this.bookRepository.deleteById(id);
  }

  public void saveMultipleBooks(List<Book> books) {
    this.bookRepository.saveAll(books);
  }

}
