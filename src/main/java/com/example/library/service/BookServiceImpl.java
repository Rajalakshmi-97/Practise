package com.example.library.service;

import com.example.library.entity.Book;
import com.example.library.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookServices {

    @Autowired
    private BookRepo bookRepository;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> search(String bname) {
        return bookRepository.findByBname(bname);
    }

    @Override
    public void delete(String bookId) {
        bookRepository.deleteById(bookId);
    }

    @Override
    public Book applyForBook(String bname) {
        List<Book> books = bookRepository.findByBname(bname);
        if (!books.isEmpty() && books.get(0).getQuantity() > 0) {
            Book book = books.get(0);
            book.setQuantity(book.getQuantity() - 1);
            bookRepository.save(book);
            return book;
        } else {
            return null;
        }
    }

}

