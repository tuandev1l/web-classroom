package exam.practice.errorCatching;

public class NotFoundPhoneException extends RuntimeException {
  public NotFoundPhoneException(String message) {
    super(message);
  }

  public NotFoundPhoneException(String message, Throwable cause) {
    super(message, cause);
  }

  public NotFoundPhoneException(Throwable cause) {
    super(cause);
  }
}
