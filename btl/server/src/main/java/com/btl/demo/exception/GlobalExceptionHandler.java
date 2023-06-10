package com.btl.demo.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
  public String returnStatus(int statusCode) {
    if (String.valueOf(statusCode).startsWith("4")) return "fail";
    return "error";
  }

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e) {
    ErrorResponse errorResponse = new ErrorResponse(returnStatus(HttpStatus.NOT_FOUND.value()),
        e.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handlePermissionException(PermissionException e) {
    ErrorResponse errorResponse =
        new ErrorResponse(returnStatus(HttpStatus.FORBIDDEN.value()),
            e.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
  }

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handleDuplicateFieldException(DuplicatedException e) {
    ErrorResponse errorResponse =
        new ErrorResponse(returnStatus(HttpStatus.BAD_REQUEST.value()),
            e.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handleInvalidException(InvalidException e) {
    ErrorResponse errorResponse =
        new ErrorResponse(returnStatus(HttpStatus.BAD_REQUEST.value()),
            e.getMessage());
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handleTypeMismatchException(MethodArgumentTypeMismatchException e) {
    ErrorResponse errorResponse =
        new ErrorResponse(returnStatus(HttpStatus.BAD_REQUEST.value()), "ID " +
            "must be Long not String");
    //                String.format("%s must be %s, not %s", e.getName(),
    //                e.getRequiredType().toString().split("\\.")[2],
    //                e.getValue().getClass().toString()).split("\\.")[2]);
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler
  public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException e) {
    StringBuilder message = new StringBuilder();
    for (ConstraintViolation<?> constraintViolation :
        e.getConstraintViolations()) {
      message.append(constraintViolation.getMessage());
    }
    ErrorResponse errorResponse = new ErrorResponse(returnStatus(HttpStatus.BAD_REQUEST.value()),
        message.toString());
    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    StringBuilder message = new StringBuilder();
    for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
      message.append(fieldError.getDefaultMessage()).append(", ");
    }
    ErrorResponse errorResponse = new ErrorResponse(returnStatus(ex.getStatusCode().value()),
        message.toString());
    return new ResponseEntity<>(errorResponse, ex.getStatusCode());
  }
}
