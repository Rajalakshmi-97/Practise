package com.example.myproject.service.impl;


import com.example.myproject.model.Book;
import com.example.myproject.repository.IBookRepository;
import com.example.myproject.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService implements IBookService {
    @Autowired
    private IBookRepository bookRepository ;
    @Override
    public List<Book> all() {
        return bookRepository.findAll();
    }

    @Override
    public Book getById(Long id) {
        return  bookRepository.findById(id).get();
    }

    @Override
    public Book add(Book faculty) {
        return bookRepository.save(faculty);
    }

    @Override
    public Book update(Book faculty) {
        return bookRepository.save(faculty);
    }

    @Override
    public void delete(Long id) {
        bookRepository.deleteById(id);
    }
}
