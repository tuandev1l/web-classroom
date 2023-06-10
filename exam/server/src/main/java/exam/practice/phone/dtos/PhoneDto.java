package exam.practice.phone.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class PhoneDto {
  @NotNull()
  @NotBlank(message = "Name must be string, not empty")
  private String name;

  @NotNull()
  @NotBlank(message = "Brand must be string, not empty")
  private String brand;

  @NotNull()
  private Date date;

  @NotNull(message = "isSold must be boolean, not empty")
  private boolean isSold;
}
