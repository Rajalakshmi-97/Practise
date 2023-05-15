package com.example.library.entity;

import jakarta.persistence.*;

@Entity
@Table
public class Book {
    private String bname;
    @Id
    private String bookId;
    private String author;
    private String publisher;
    private int quantity;
    private int edition;

    @ManyToOne
    @JoinColumn(name = "regno")
    private Student student;

    public Book() {
    }

    public Book(String bname, String bookId, String author, String publisher, int quantity, int edition) {
        this.bname = bname;
        this.bookId = bookId;
        this.author = author;
        this.publisher = publisher;
        this.quantity = quantity;
        this.edition = edition;
    }

    public String getBname() {
        return bname;
    }

    public void setBname(String bname) {
        this.bname = bname;
    }

    public String getBookId() {
        return bookId;
    }

    public void setBookId(String bookId) {
        this.bookId = bookId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getEdition() {
        return edition;
    }

    public void setEdition(int edition) {
        this.edition = edition;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

}
