package com.btl.demo.controller;

import com.btl.demo.entity.BookType;
import com.btl.demo.service.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/types")
@RequiredArgsConstructor
public class TypeController {
  private final TypeService typeService;

  @GetMapping("")
  public List<BookType> types() {
    return this.typeService.getAllBookTypes();
  }
}
