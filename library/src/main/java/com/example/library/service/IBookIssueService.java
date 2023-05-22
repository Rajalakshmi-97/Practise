package com.example.library.service;

import com.example.library.model.BookIssue;
import com.example.library.model.Student;

import java.util.List;

public interface IBookIssueService {
    List<BookIssue> all();
    BookIssue getById(Long id);
    BookIssue add(BookIssue faculty);
    BookIssue update(BookIssue faculty);
    void delete(Long id);
}
