package com.example.myproject.controller;



import com.example.myproject.model.Book;
import com.example.myproject.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class BookController {
    @Autowired
    private IBookService bookService;

    @GetMapping("/book")
    private ResponseEntity<?> all() {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(bookService.all(), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/book/{id}")
    private ResponseEntity<?> getById(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(bookService.getById(id), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/book")
    private ResponseEntity<?> addUser(@RequestBody Book user) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(bookService.add(user), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PatchMapping("/book/{id}")
    private ResponseEntity<?> updateUser(@RequestBody Book book, @PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            Book b=bookService.getById(id);
            b.setAuthor(book.getAuthor());
            b.setBookName(book.getBookName());
            b.setEdition(book.getEdition());
            b.setPublisher(book.getPublisher());
            b.setStatus(book.getStatus());
            b.setQuantity(book.getQuantity());

            return new ResponseEntity<>(bookService.update(b), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/book/{id}")
    private ResponseEntity<?> deleteUser(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            bookService.delete(id);
            res.put("msg", "User deleted successfully");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
