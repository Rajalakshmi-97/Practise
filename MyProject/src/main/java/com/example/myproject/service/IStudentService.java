package com.example.myproject.service;



import com.example.myproject.model.Student;

import java.util.List;

public interface IStudentService {

    List<Student> all();
    Student getById(Long id);
    Student add(Student faculty);
    Student update(Student faculty);
    void delete(Long id);
    Student getByEmailAndPassword(String email,String password);

    Student getByEmail(String email);

    List<Student> findStudentByFacultyEmail(String facultyEmail);
}
