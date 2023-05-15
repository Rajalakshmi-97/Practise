package com.example.library.entity;

import jakarta.persistence.*;
import java.util.List;

@Table
@Entity
public class Student {
    private String sname;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String regno;
    private String stream;
    @OneToMany
    private List<Book> books;

    public Student() {
    }

    public Student(String sname, String regno, String stream) {
        this.sname = sname;
        this.regno = regno;
        this.stream = stream;
    }

    // getters and setters for sname, regno, stream, and books

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public boolean search(String bookTitle) {
        // code to search for a book with the given title
        // return true if the book is available, false otherwise
        for (Book book : books) {
            if (book.getBname().equals(bookTitle) && book.getQuantity() > 0) {
                return true;
            }
        }
        return false;
    }

    public void apply(Book book) {
        // code to apply for a book
        if (book.getQuantity() > 0) {
            book.setQuantity(book.getQuantity() - 1);
            books.add(book);
        }
    }

    public void Reserve(Book book) {
        // code to reserve a book
        if (book.getQuantity() > 0) {
            book.setQuantity(book.getQuantity() - 1);
            books.add(book);
        }
    }

    public void Cancel(Book book) {
        // code to cancel a book reservation
        if (books.contains(book)) {
            book.setQuantity(book.getQuantity() + 1);
            books.remove(book);
        }
    }
}
