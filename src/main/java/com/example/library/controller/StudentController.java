package com.example.library.controller;

import com.example.library.entity.Student;
import com.example.library.service.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StudentController {
    @Autowired
    private StudentServices studentServices;

    @GetMapping("/searchBook/{regno}/{bookTitle}")
    public ResponseEntity<String> searchBook(@PathVariable("regno") String regno, @PathVariable("bookTitle") String bookTitle) {
        boolean available = studentServices.search(regno, bookTitle);
        if (available) {
            return ResponseEntity.ok("Book is available");
        } else {
            return ResponseEntity.ok("Book is not available");
        }
    }

    @GetMapping("/applyForBook/{regno}/{bookId}")
    public ResponseEntity<String> applyForBook(@PathVariable("regno") String regno, @PathVariable("bookId") String bookId) {
        Student student = studentServices.applyForBook(regno, bookId);
        if (student != null) {
            return ResponseEntity.ok("Book applied successfully");
        } else {
            System.out.println("Book not found or quantity is 0");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/reserveBook/{regno}/{bookId}")
    public ResponseEntity<String> reserveBook(@PathVariable("regno") String regno, @PathVariable("bookId") String bookId) {
        Student student = studentServices.reserveBook(regno, bookId);
        if (student != null) {
            return ResponseEntity.ok("Book reserved successfully");
        } else {
            System.out.println("Book not found or quantity is 0");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/cancelBook/{regno}/{bookId}")
    public ResponseEntity<String> cancelBook(@PathVariable("regno") String regno, @PathVariable("bookId") String bookId) {
        Student student = studentServices.cancelBook(regno, bookId);
        if (student != null) {
            return ResponseEntity.ok("Book reservation canceled successfully");
        } else {
            System.out.println("Book not found or not reserved by the student");
            return ResponseEntity.notFound().build();
        }
    }
}
