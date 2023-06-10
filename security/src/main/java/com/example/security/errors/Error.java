package exam.practice.errorCatching;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class Error {
  private int status;
  private String message;
  private Long timestamp;

  public Error(int status, String message) {
    this.status = status;
    this.message = message;
    this.timestamp = new Date().getTime();
  }
}
