package com.example.library.controller;

import com.example.library.entity.Administrator;
import com.example.library.service.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "/administrator")
@RestController
public class AdministratorController {
    @Autowired
    AdministratorService am;

    @GetMapping("/testAdministrator")
    public String test() {
        return "in Admin Controller";
    }

    @GetMapping("/getAdministrator")
    List<Administrator> getAdministrator() {
        List<Administrator> AdminList = am.getAll();
        return AdminList;
    }

    @PostMapping("/add")
    Administrator addAdministrator(@RequestBody Administrator administrator) {
        Administrator a1 = am.save(administrator);
        return a1;
    }

    @GetMapping("/getAdministrator/{Regno}")
    public Administrator getAdministratorByRegno(@PathVariable String Regno) {
        return am.getAdministratorByRegno(Regno);
    }
}