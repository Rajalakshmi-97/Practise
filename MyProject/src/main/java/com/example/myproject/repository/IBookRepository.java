package com.example.myproject.repository;


import com.example.myproject.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface IBookRepository extends JpaRepository<Book,Long> {
}
