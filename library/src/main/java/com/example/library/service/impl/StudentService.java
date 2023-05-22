package com.example.library.service.impl;

import com.example.library.model.Student;
import com.example.library.repository.IStudentRepository;
import com.example.library.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements IStudentService {
    @Autowired
    private IStudentRepository studentRepository;
    @Override
    public List<Student> all() {
        return studentRepository.findAll();
    }

    @Override
    public Student getById(Long id) {
        return studentRepository.findById(id).get();
    }

    @Override
    public Student add(Student faculty) {
        return studentRepository.save(faculty);
    }

    @Override
    public Student update(Student faculty) {
        return studentRepository.save(faculty);
    }

    @Override
    public void delete(Long id) {
            studentRepository.deleteById(id);
    }

    @Override
    public Student getByEmailAndPassword(String email, String password) {
        return null;
    }

    @Override
    public Student getByEmail(String email) {
        return null;
    }

    @Override
    public List<Student> findStudentByFacultyEmail(String facultyEmail) {
        return null;
    }
}
