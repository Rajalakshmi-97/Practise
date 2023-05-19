package com.example.myproject.service;


import com.example.myproject.model.BookIssue;

import java.util.List;

public interface IBookIssueService {
    List<BookIssue> all();
    BookIssue getById(Long id);
    BookIssue add(BookIssue faculty);
    BookIssue update(BookIssue faculty);
    void delete(Long id);
}
