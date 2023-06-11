package com.btl.demo.dtos.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto {
  @NotNull(message = "Name must not be null")
  @Size(min = 2, max = 20, message = "Name must at least 2 characters")
  private String name;

  @NotNull(message = "Email must not be null")
  @Size(min = 2, max = 20, message = "Email must at least 2 characters")
  @Email
  private String email;

  @NotNull(message = "Address must not be null")
  @Size(min = 2, message = "Address must at least 2 characters")
  private String address;

  @NotNull(message = "Password must not be null")
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      message = "Password must be at least 8 characters, lower, upper, number" +
          " and special character")
  private String password;

  @NotNull(message = "Password confirm must not be null")
  private String passwordConfirm;
}
