package com.btl.demo.dtos.item;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
  @NotNull(message = "bookId must not be null")
  @Min(value = 1, message = "bookId must above 1")
  private long bookId;

  @NotNull(message = "quantity must not be null")
  @Min(value = 0, message = "quantity must above 0")
  private long quantity;
}
