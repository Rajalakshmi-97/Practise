package com.example.library.controller;


import com.example.library.entity.Login;
import com.example.library.service.ILoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class LoginController {
    @Autowired
    ILoginService iLoginService;

    @GetMapping("/getLogin")
    List<Login>getLogin(){
        List<Login> LoginList=iLoginService.getAll();
        return LoginList;
    }



    @GetMapping("/getUserName/{UserId}")
    @ResponseBody
    public Optional<Login> getByUsername(@PathVariable String UserId){
        return iLoginService.getByUsername(UserId);
    }

    @GetMapping("/getPasswordByUserId/{userId}")
    @ResponseBody
    public String getPasswordByUserId(@PathVariable String userId){
        return iLoginService.getPasswordByUserId(userId);
    }
    @PostMapping("/addData")
    public Login addData(@RequestBody Login login) {
        return iLoginService.addData(login);
    }



//
//    @GetMapping("/getById/{UserId ,Password}")
//    @ResponseBody
//    Optional<Login> findByPasswordOrUserId(String Password,String UserId)
//    {
//        return iLoginService.findByPasswordOrUserId(Password,UserId);
//    }
}