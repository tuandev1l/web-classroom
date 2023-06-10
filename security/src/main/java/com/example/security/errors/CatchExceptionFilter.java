package com.example.security.errors;

import com.btl.demo.exception.JWTException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
@Component
public class CatchExceptionFilter extends OncePerRequestFilter {
  private String message;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    try {
      if (request.getHeader("Authorization") == null && !request.getRequestURI().contains("auth")) {
        throw new JWTException("You have to login before accessing that!");
      }
      filterChain.doFilter(request, response);
    } catch (MalformedJwtException e) {
      message = "Token is not valid!";
    } catch (ExpiredJwtException e) {
      message = "Token has been expired!";
    } catch (Exception e) {
      logger.error(e.getMessage());
      message = e.getMessage();
    } finally {
      if (message != null) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        //        response.setHeader("Content-type", "application/json");
        //        ErrorResponse errorResponse = new ErrorResponse("fail", message);
        //        String employeeJsonString = new Gson().toJson(errorResponse);
        PrintWriter printWriter = response.getWriter();
        //        printWriter.write(employeeJsonString);
        printWriter.flush();
        printWriter.write("test");
        printWriter.flush();
        printWriter.close();
      }
    }
  }
}
