package com.example.security.config;

import com.example.security.errors.JWTException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.MediaType;
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
      if (request.getHeader("Authorization") == null) {
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
        response.setContentType(MediaType.APPLICATION_JSON.getType());
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("status", "fail");
        jsonObject.put("message", message);
        PrintWriter printWriter = response.getWriter();
        printWriter.println(jsonObject);
        printWriter.flush();

      }
    }
  }
}
