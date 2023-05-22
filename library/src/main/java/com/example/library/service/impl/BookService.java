package com.example.library.service.impl;

import com.example.library.model.Book;
import com.example.library.repository.IBookIssueRepository;
import com.example.library.repository.IBookRepository;
import com.example.library.service.IBookService;
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
