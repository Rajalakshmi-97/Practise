package com.example.library.service;

import com.example.library.entity.Book;

import java.util.List;

public interface BookServices {
    List<Book> getAllBooks();

    Book save(Book book);

    List<Book> search(String bname);


    void delete(String bookId);

    Book applyForBook(String bname);
}