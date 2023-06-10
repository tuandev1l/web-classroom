package exam.practice.errorCatching;

public class NotIntegerException extends RuntimeException {
  public NotIntegerException(String message) {
    super(message);
  }

  public NotIntegerException(String message, Throwable cause) {
    super(message, cause);
  }

  public NotIntegerException(Throwable cause) {
    super(cause);
  }
}
