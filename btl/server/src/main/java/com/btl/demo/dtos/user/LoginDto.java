package com.btl.demo.dtos.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
  @NotNull(message = "Email must not be null")
  @Size(min = 2, max = 20, message = "")
  @Email
  private String email;

  @NotNull(message = "Password must not be null")
  private String password;
}
