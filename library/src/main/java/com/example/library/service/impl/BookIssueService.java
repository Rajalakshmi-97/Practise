package com.example.library.service.impl;

import com.example.library.model.BookIssue;
import com.example.library.model.Student;
import com.example.library.repository.IBookIssueRepository;
import com.example.library.service.IBookIssueService;
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
