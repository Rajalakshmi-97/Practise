package com.example.library.service;

import com.example.library.entity.Administrator;

import java.util.List;

public interface AdministratorService {
    List<Administrator> getAll();
    Administrator save(Administrator administrator);

    Administrator getAdministratorByRegno(String regno);

}
