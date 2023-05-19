package com.example.myproject.service.impl;

import com.example.myproject.model.BookIssue;
import com.example.myproject.repository.IBookIssueRepository;
import com.example.myproject.service.IBookIssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BookIssueService implements IBookIssueService {

    @Autowired
    private IBookIssueRepository bookIssueRepository;

    @Override
    public List<BookIssue> all() {
        return bookIssueRepository.findAll();
    }

    @Override
    public BookIssue getById(Long id) {
        return bookIssueRepository.findById(id).get();
    }

    @Override
    public BookIssue add(BookIssue faculty) {
        return bookIssueRepository.save(faculty);
    }

    @Override
    public BookIssue update(BookIssue faculty) {
        return bookIssueRepository.save(faculty);
    }

    @Override
    public void delete(Long id) {
        bookIssueRepository.deleteById(id);
    }
}
