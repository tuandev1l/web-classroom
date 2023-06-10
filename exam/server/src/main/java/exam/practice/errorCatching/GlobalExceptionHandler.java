package com.pojo.crudpojo.errorCatching;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler
  public ResponseEntity<Error> handleNotFoundException(NotFoundStudentException exc) {
    Error error = new Error(HttpStatus.NOT_FOUND.value(), exc.getMessage());
    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler
  public ResponseEntity<Error> handleNotIntegerException(NotIntegerException exc) {
    Error error = new Error(HttpStatus.BAD_REQUEST.value(), exc.getMessage());
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<Error> handleGlobalException(Exception e) {
    Error error = new Error(HttpStatus.BAD_REQUEST.value(), e.getMessage());
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

}