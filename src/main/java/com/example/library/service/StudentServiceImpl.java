package com.example.library.service;

import com.example.library.entity.Book;
import com.example.library.entity.Student;
import com.example.library.repository.BookRepo;
import com.example.library.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentServices {

    @Autowired
    private StudentRepo studentRepository;

    @Autowired
    private BookRepo bookRepository;



    @Override
    public boolean search(String regno, String bookTitle) {
        Optional<Student> studentOptional = studentRepository.findById(regno);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            for (Book book : student.getBooks()) {
                if (book.getBname().equals(bookTitle)) {
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public Student applyForBook(String regno, String bookId) {
        Optional<Student> studentOptional = studentRepository.findById(regno);
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (studentOptional.isPresent() && bookOptional.isPresent()) {
            Student student = studentOptional.get();
            Book book = bookOptional.get();
            if (book.getQuantity() > 0) {
                book.setQuantity(book.getQuantity() - 1);
                bookRepository.save(book);
                student.getBooks().add(book);
                studentRepository.save(student);
                return student;
            }
        }
        return null;
    }

    @Override
    public Student reserveBook(String regno, String bookId) {
        Optional<Student> studentOptional = studentRepository.findById(regno);
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (studentOptional.isPresent() && bookOptional.isPresent()) {
            Student student = studentOptional.get();
            Book book = bookOptional.get();
            if (book.getQuantity() > 0) {
                book.setQuantity(book.getQuantity() - 1);
                bookRepository.save(book);
                student.getBooks().add(book);
                studentRepository.save(student);
                return student;
            }
        }
        return null;
    }

    @Override
    public Student cancelBook(String regno, String bookId) {
        Optional<Student> studentOptional = studentRepository.findById(regno);
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        if (studentOptional.isPresent() && bookOptional.isPresent()) {
            Student student = studentOptional.get();
            Book book = bookOptional.get();
            if (student.getBooks().contains(book)) {
                book.setQuantity(book.getQuantity() + 1);
                bookRepository.save(book);
                student.getBooks().remove(book);
                studentRepository.save(student);
                return student;
            }
        }
        return null;
    }
}
