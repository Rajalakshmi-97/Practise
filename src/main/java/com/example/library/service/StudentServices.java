package com.example.library.service;

import com.example.library.entity.Student;

import java.util.List;

public interface StudentServices {


    boolean search(String regno, String bookTitle);

    Student applyForBook(String regno, String bookId);

    Student reserveBook(String regno, String bookId);

    Student cancelBook(String regno, String bookId);
}
