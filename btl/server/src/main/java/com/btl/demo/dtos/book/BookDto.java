package com.btl.demo.dtos.book;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
  @NotNull(message = "Type must not be null")
  @Positive(message = "Type of book must be positive number")
  private Long type;

  @NotNull(message = "Title must not be null")
  @Size(min = 2, message = "Title at least 2 characters and at most 50 characters")
  private String title;

  @NotNull(message = "Author must not be null")
  @Size(min = 2, message = "Author at least 2 characters and at most 50 characters")
  private String author;

  @NotNull(message = "Description must not be null")
  @Size(min = 2, message = "Author at least 2 characters")
  private String description;

  @NotNull(message = "Image must not be null")
  private String image;

  @NotNull(message = "Published must not be null")
  @PastOrPresent(message = "Published book must be in the past or present")
  private LocalDate published;

  @NotNull(message = "NumberOfPages must not be null")
  @Positive(message = "number of pages must be positive numbers")
  private int numberOfPages;
}
