package com.pojo.crudpojo.errorCatching;

public class NotFoundStudentException extends RuntimeException {
  public NotFoundStudentException(String message) {
    super(message);
  }

  public NotFoundStudentException(String message, Throwable cause) {
    super(message, cause);
  }

  public NotFoundStudentException(Throwable cause) {
    super(cause);
  }
}