package com.example.security.errors;

public class JWTException extends RuntimeException {
  public JWTException(String message) {
    super(message);
  }
}
