package com.example.library.service;
import com.example.library.entity.Administrator;
import com.example.library.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AdministratorServiceImpl implements  AdministratorService{
    @Autowired
    AdministratorRepository administratorRep;
    @Override
    public List<Administrator> getAll(){
        List<Administrator> alist=administratorRep.findAll();
        return alist;
    }
    @Override
    public Administrator save(Administrator administrator)
    {
        Administrator a=administratorRep.save(administrator);
        return a;
    }
    @Override
    public Administrator getAdministratorByRegno(String regno)
    {
        Optional<Administrator> optionalAdministrator=administratorRep.findById(regno);
        return optionalAdministrator.orElse(null);
}


}
