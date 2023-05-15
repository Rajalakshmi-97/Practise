package com.example.library.entity;
import jakarta.persistence.*;

import java.util.Date;
@Table
@Entity
public class Report {
    @Id
    private String regNo;
    private String sname;
    private String bookName;
    private int noOfBooks;
    private Date issueDate;
    private Date returnDate;
    private float fine;

    public Report() {}

    public Report(String regNo, String sname, String bookName, int noOfBooks, Date issueDate, Date returnDate, float fine) {
        this.regNo = regNo;
        this.sname = sname;
        this.bookName = bookName;
        this.noOfBooks = noOfBooks;
        this.issueDate = issueDate;
        this.returnDate = returnDate;
        this.fine = fine;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public int getNoOfBooks() {
        return noOfBooks;
    }

    public void setNoOfBooks(int noOfBooks) {
        this.noOfBooks = noOfBooks;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public float getFine() {
        return fine;
    }

    public void setFine(float fine) {
        this.fine = fine;
    }

    @Override
    public String toString() {
        return "Report{" +
                "regNo='" + regNo + '\'' +
                ", sname='" + sname + '\'' +
                ", bookName='" + bookName + '\'' +
                ", noOfBooks=" + noOfBooks +
                ", issueDate=" + issueDate +
                ", returnDate=" + returnDate +
                ", fine=" + fine +
                '}';
    }
}
