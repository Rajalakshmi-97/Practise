package com.example.myproject.repository;


import com.example.myproject.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface IStudentRepository extends JpaRepository<Student,Long> {
}
