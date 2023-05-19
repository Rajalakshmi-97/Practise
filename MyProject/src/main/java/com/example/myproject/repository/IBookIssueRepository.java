package com.example.myproject.repository;

import com.example.myproject.model.BookIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface IBookIssueRepository extends JpaRepository<BookIssue,Long> {
}
