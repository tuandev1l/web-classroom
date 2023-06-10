package com.btl.demo.dtos.comment;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
  @NotNull(message = "Message must not be null")
  @Size(min = 2, max = 500, message = "Message must at least 2 characters")
  private String message;

  @NotNull(message = "Rate must not be null")
  @Max(value = 5, message = "rate must below 5")
  @Min(value = 1, message = "rate must above 1")
  private float rate;

  @NotNull(message = "Order must not be null")
  private Long orderId;
}
