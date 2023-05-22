package com.example.library.controller;

import com.example.library.model.BookIssue;
import com.example.library.model.Student;
import com.example.library.service.IBookIssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class BookIssueController {
    @Autowired
    private IBookIssueService bookIssueService;

    @GetMapping("/bookIssue")
    private ResponseEntity<?> all() {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(bookIssueService.all(), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/bookIssue/{id}")
    private ResponseEntity<?> getById(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(bookIssueService.getById(id), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/bookIssue")
    private ResponseEntity<?> addUser(@RequestBody BookIssue user) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(bookIssueService.add(user), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping("/bookIssue/{id}")
    private ResponseEntity<?> updateUser(@RequestBody BookIssue user, @PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            BookIssue u = bookIssueService.getById(id);
            u.setIssueDate(user.getIssueDate());
            u.setStatus(user.getStatus());
            u.setPeriod(user.getPeriod());
            u.setDueDate(user.getDueDate());
            u.setFine(user.getFine());
            u.setReturnDate(user.getReturnDate());
            return new ResponseEntity<>(bookIssueService.update(u), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/bookIssue/{id}")
    private ResponseEntity<?> deleteUser(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            bookIssueService.delete(id);
            res.put("msg", "User deleted successfully");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
