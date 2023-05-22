package com.example.library.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data @ToString
public class BookIssue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long bookId;
    private Long studentId;
    private LocalDate issueDate;
    private Integer period;
    private LocalDate returnDate;
    private Date dueDate;
    private Number fine;
    private String status;

}
