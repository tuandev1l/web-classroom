package com.example.ex2;

import java.io.*;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(urlPatterns = {"/background-random"})
public class HelloServlet extends HttpServlet {
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    try {
      RequestDispatcher requestDispatcher=request.getRequestDispatcher("/WEB" +
          "-INF/index.html");
      requestDispatcher.forward(request,response);
    } catch (Exception e) {
      System.out.println(e);
    }
  }
}