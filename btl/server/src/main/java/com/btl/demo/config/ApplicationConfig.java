package com.btl.demo.config;

import com.btl.demo.entity.Book;
import com.btl.demo.service.BookService;
import com.btl.demo.service.TypeService;
import com.btl.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
  private final UserService userService;
  private final BookService bookService;
  private final TypeService typeService;

  // todo: fetch user from db
  @Bean
  public UserDetailsService userDetailsService() {
    return userService::getUserByEmail;
  }

  // todo: data access object to fetch user details and encode password
  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService());
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public void createDefaultBookType() {
    if (typeService.getAllBookTypes().size() == 0) {
      typeService.saveMultipleBookTypes(List.of("Detective", "Novel", "Scared"
          , "Loved", "Scientific", "Motivation", "Short story", "Cooking", "History"));
    }
  }

  @Bean
  public void createDefaultBook() {
    if (bookService.getAllBooks().size() == 0) {
      try {
        File file = new File("C:\\Users\\tuantm\\Desktop\\books.txt");
        Scanner scanner = new Scanner(file);
        int cnt = 0;
        while (scanner.hasNextLine()) {
          String content = scanner.nextLine();
          if (!content.equals("")) {
            try {
              String[] values = content.split(", ");
              Book book = new Book();
              book.setType(typeService.getBookType(Integer.parseInt(values[0])));
              book.setTitle(values[1]);
              book.setAuthor(values[2]);
              book.setMoney(Integer.parseInt(values[3]));
              book.setPublished(LocalDate.parse(values[4].split(" ")[0]));
              book.setNumberOfPages(Integer.parseInt(values[5]));
              book.setImage(values[6]);
              book.setDescription(values[7]);
              this.bookService.saveBook(book);
            } catch (Exception exp) {
              System.out.println(exp);
            }
          }
        }
        System.out.println(cnt);
      } catch (Exception e) {
        System.out.println("There is no book file");
      }
    }
  }
}
