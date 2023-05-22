package com.example.library.service;

import com.example.library.model.Book;
import com.example.library.model.BookIssue;

import java.util.List;

public interface IBookService {
    List<Book> all();
    Book getById(Long id);
    Book add(Book faculty);
    Book update(Book faculty);
    void delete(Long id);
}
