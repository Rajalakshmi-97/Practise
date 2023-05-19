package com.example.myproject.service;



import com.example.myproject.model.Book;

import java.util.List;

public interface IBookService {
    List<Book> all();
    Book getById(Long id);
    Book add(Book faculty);
    Book update(Book faculty);
    void delete(Long id);
}
