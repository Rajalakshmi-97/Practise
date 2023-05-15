package com.example.library.service;

import com.example.library.entity.Login;
import com.example.library.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoginService implements ILoginService {
    @Autowired
    LoginRepository loginRepository;
    @Override
    public List<Login>getAll(){
        List<Login> list = (List<Login>) loginRepository.findAll();
        return list;

    }
//   public Optional<Login> findByPasswordOrUserId(String Password,String UserId){
//        Optional<Login> aList=loginRepository.findByPasswordOrUserId(Password,UserId);
//       System.out.println(aList);
//       return aList;
//    }

    @Override
    public Optional<Login> getByUsername(String userId) {
        Optional<Login> aList=loginRepository.findById(userId);
        System.out.println(aList.get().getUserId());
        return(aList) ;
    }

    //    @Override
    @Override
    public String getPasswordByUserId(String userId) {
        Optional<Login> login = loginRepository.findById(userId);
        if (login.isPresent()) {
            return login.get().getPassword();
        } else {
            return null;
        }
    }


    public Login addData(Login login) {
        return loginRepository.save(login);
    }


//    public Optional<Login> getByPassword(String password) {
//        Optional<Login> aList=loginRepository.findById(password);
//        System.out.println(aList);
//        return aList;
//    }



//    @Override
//    public Login getByPassword(String password){
//        return loginRepository.findById(password).get();
//    }

}