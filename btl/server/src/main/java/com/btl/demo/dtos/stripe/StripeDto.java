package com.btl.demo.dtos.stripe;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StripeDto {
  @NotNull(message = "description not be null")
  private String description;

  @NotNull(message = "amount not be null")
  private Long amount;
}
