package com.example.library.dto;

import java.util.Date;

public class ReturnDetailsDTO {
    private String regNo;
    private String sname;
    private Date returnDate;
    private float fine;

    public ReturnDetailsDTO() {}

    public ReturnDetailsDTO(String regNo, String sname, Date returnDate, float fine) {
        this.regNo = regNo;
        this.sname = sname;
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
        return "ReturnDetailsDTO{" +
                "regNo='" + regNo + '\'' +
                ", sname='" + sname + '\'' +
                ", returnDate=" + returnDate +
                ", fine=" + fine +
                '}';
    }
}

