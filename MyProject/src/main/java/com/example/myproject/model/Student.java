package com.example.myproject.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
@ToString @Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String registerNumber;
    private String name;
    private String stream;
    private Integer admissionYear;
    private Long phoneNumber;
    private String email;
    private String userName;
    private String password;
    private Boolean status = false;

    @OneToMany
    Set<Book> books = new HashSet<>();
    @OneToMany
    List<BookIssue> bookIssues= new ArrayList<>();

}
