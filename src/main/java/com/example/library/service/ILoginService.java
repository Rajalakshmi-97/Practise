package com.example.library.service;

import com.example.library.entity.Login;

import java.util.List;
import java.util.Optional;

public interface ILoginService {
    List<Login> getAll();

    Optional<Login> getByUsername(String userId);
    String getPasswordByUserId(String userId);
//Optional<Login> findByPasswordOrUserId(String Password,String UserId);
Login addData(Login login);

}