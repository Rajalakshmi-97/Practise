package com.example.myproject.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor @ToString @Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_id_generator")
    @SequenceGenerator(name = "book_id_generator", sequenceName = "book_id_seq", allocationSize = 50)
    private Long id;
    private String bookName;
    private String author;
    private String publisher;
    private Integer quantity;
    private Integer edition;
    private String status;
}


