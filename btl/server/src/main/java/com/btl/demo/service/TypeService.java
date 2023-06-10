package com.btl.demo.service;

import com.btl.demo.entity.BookType;
import com.btl.demo.exception.NotFoundException;
import com.btl.demo.repository.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeService {
  private final TypeRepository typeRepository;

  public List<BookType> getAllBookTypes() {
    return this.typeRepository.findAll();
  }

  public BookType getBookType(long id) {
    return this.typeRepository.findById(id).orElseThrow(() -> new NotFoundException("There is no type with this ID"));
  }

  public BookType getBookTypeByName(String typeName) {
    String stringBuilder = String.valueOf(typeName.charAt(0)).toUpperCase() +
        typeName.substring(1);
    return this.typeRepository.getBookTypeByName(stringBuilder);
  }

  public BookType createType(String type) {
    BookType newBookType = new BookType();
    newBookType.setName(type);
    return this.typeRepository.save(newBookType);
  }

  public void saveMultipleBookTypes(List<String> bookTypes) {
    List<BookType> typeList = new ArrayList<>();
    for (String bookType : bookTypes) {
      BookType type = new BookType(null, bookType, null, null, null);
      typeList.add(type);
    }
    this.typeRepository.saveAll(typeList);
  }

}
