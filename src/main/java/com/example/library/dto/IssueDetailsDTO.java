package com.example.library.dto;

import java.util.Date;

public class IssueDetailsDTO {
    private String regNo;
    private String sname;
    private String bookName;
    private int noOfBooks;
    private Date issueDate;

    public IssueDetailsDTO() {}

    public IssueDetailsDTO(String regNo, String sname, String bookName, int noOfBooks, Date issueDate) {
        this.regNo = regNo;
        this.sname = sname;
        this.bookName = bookName;
        this.noOfBooks = noOfBooks;
        this.issueDate = issueDate;
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

    @Override
    public String toString() {
        return "IssueDetailsDTO{" +
                "regNo='" + regNo + '\'' +
                ", sname='" + sname + '\'' +
                ", bookName='" + bookName + '\'' +
                ", noOfBooks=" + noOfBooks +
                ", issueDate=" + issueDate +
                '}';
    }
}
