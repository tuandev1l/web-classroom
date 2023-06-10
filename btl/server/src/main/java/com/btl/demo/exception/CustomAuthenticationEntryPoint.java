package com.btl.demo.exception;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
    ErrorResponse errorResponse = new ErrorResponse("fail", "Invalid token or" +
        " you do not login, please login again");
    String message = new Gson().toJson(errorResponse);
    response.setStatus(HttpStatus.BAD_REQUEST.value());
    response.setContentType("application/json");
    response.getWriter().write(message);
  }
}
