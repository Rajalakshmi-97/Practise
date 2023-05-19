package com.example.myproject.controller;


import com.example.myproject.model.Book;
import com.example.myproject.model.BookIssue;
import com.example.myproject.model.Student;
import com.example.myproject.service.IBookIssueService;
import com.example.myproject.service.IBookService;
import com.example.myproject.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class StudentController {
    @Autowired
    private IStudentService studentService;
    @Autowired
    private IBookService bookService;
    @Autowired
    private IBookIssueService bookIssueService;

    @PostMapping("/studentLogin")
    private ResponseEntity<?> login(@RequestBody Student user) {
        HashMap<String, String> res = new HashMap<>();
        try {
            if (user.getEmail().equals("") && user.getPassword().equals("")) {
                res.put("msg", "please fill all the fields");
                return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
            }
            Student checkUser = studentService.getByEmailAndPassword(user.getEmail(), user.getPassword());
            if (checkUser == null) {
                res.put("msg", "User not found");
                return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
            } else {
                res.put("msg", "user login successfully");
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/studentRegister")
    private ResponseEntity<?> register(@RequestBody Student user) {
        HashMap<String, String> res = new HashMap<>();
        try {
            if (user.getEmail().equals("") && user.getName().equals("") && user.getPassword().equals("")) {
                res.put("msg", "Please fill all the fields");
                return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
            }
            boolean checkUser = studentService.getByEmail(user.getEmail()) != null;
            if (checkUser) {
                res.put("msg", "Student already exists");
                return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
            } else {
                studentService.add(user);
                res.put("msg", "Student added successfully");
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/applyBook/{id}/{bId}")
    private ResponseEntity<?> allUsers(@PathVariable Long id, @PathVariable Long bId) {
        HashMap<String, String> res = new HashMap<>();
        try {
            Student student = studentService.getById(id);
            Book book = bookService.getById(bId);
            student.getBooks().add(book);
            return new ResponseEntity<>(studentService.update(student), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/applyBookIssue/{id}/{bId}")
    private ResponseEntity<?> bookIssue(@PathVariable Long id, @PathVariable Long bId) {
        HashMap<String, String> res = new HashMap<>();
        try {
            Student student = studentService.getById(id);
            BookIssue book = bookIssueService.getById(bId);
            student.getBookIssues().add(book);
            return new ResponseEntity<>(studentService.update(student), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/student")
    private ResponseEntity<?> all() {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(studentService.all(), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/student/{id}")
    private ResponseEntity<?> getById(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(studentService.getById(id), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/studentByEmail/{email}")
    private ResponseEntity<?> getByEmail(@PathVariable String email) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(studentService.getByEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/student")
    private ResponseEntity<?> addUser(@RequestBody Student user) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(studentService.add(user), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping("/student/{id}")
    private ResponseEntity<?> updateUser(@RequestBody Student user, @PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            Student u = studentService.getById(id);
            u.setName(user.getName());
            u.setEmail(user.getEmail());
            u.setPassword(user.getPassword());
            u.setStream(user.getStream());
            u.setAdmissionYear(user.getAdmissionYear());
            u.setPhoneNumber(user.getPhoneNumber());
            u.setRegisterNumber(user.getRegisterNumber());
            u.setUserName(user.getUserName());
            u.setStatus(user.getStatus());
            return new ResponseEntity<>(studentService.update(u), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/student/{id}")
    private ResponseEntity<?> deleteUser(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            studentService.delete(id);
            res.put("msg", "User deleted successfully");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
