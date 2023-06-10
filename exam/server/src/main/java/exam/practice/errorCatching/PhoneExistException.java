package exam.practice.errorCatching;

public class PhoneExistException extends RuntimeException {
  public PhoneExistException(String message) {
    super(message);
  }
}
