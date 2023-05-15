package com.example.library.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table
@Entity
public class Administrator {
    private String sname;
    @Id
    private String regNo;
    private String stream;
    private String className;
    private String phoneNo;
    private String email;
    private String userName;
    private String password;

    public Administrator() {}

    public Administrator(String sname, String regNo, String stream, String className, String phoneNo, String email, String userName, String password) {
        this.sname = sname;
        this.regNo = regNo;
        this.stream = stream;
        this.className = className;
        this.phoneNo = phoneNo;
        this.email = email;
        this.userName = userName;
        this.password = password;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getStream() {
        return stream;
    }

    public void setStream(String stream) {
        this.stream = stream;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Administrator{" +
                "sname='" + sname + '\'' +
                ", regNo='" + regNo + '\'' +
                ", stream='" + stream + '\'' +
                ", className='" + className + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                ", email='" + email + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

