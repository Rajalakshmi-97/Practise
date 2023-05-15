package com.example.library.controller;


import com.example.library.entity.Book;
import com.example.library.service.BookServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookServices bookServices;

    @GetMapping("/testBooks")
    public String test() {
        return "In Book controller";
    }

    @GetMapping("/getAll")
    List<Book> getBook(){
        List<Book> bookList = bookServices.getAllBooks();
        return bookList;
    }
    @PostMapping("/addBooks")
    Book addBook(@RequestBody Book book)
    {
        Book b = bookServices.save(book);
        return b;
    }

    @DeleteMapping("/deleteBook/{bookid}")
    public String deleteBookById(@PathVariable String bookid) {
        bookServices.delete(bookid);
        return "book with id " + bookid + " is deleted successfully";
    }


    @GetMapping("/book/search/{bname}")
    public ResponseEntity<List<Book>> searchBooks(@PathVariable("bname") String bname) {
        List<Book> books = bookServices.search(bname);
        if (!books.isEmpty()) {
            return ResponseEntity.ok(books);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/applyForBook/{bname}")
    public ResponseEntity<String> applyForBook(@PathVariable("bname") String bname){
        Book book = bookServices.applyForBook(bname);
        if(book != null){
            return ResponseEntity.ok("Book "+bname+" applied successfully");
        } else{
            System.out.println("Book not found or quantity is 0");
            return ResponseEntity.notFound().build();
        }
    }



}

