package com.example.library.repository;

import com.example.library.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface LoginRepository extends JpaRepository<Login, String> {
    List<Login> findAll();
    Optional<Login> findById(String userId);
//    Optional<Login> findById(String Password);



//Optional<Login> findByPasswordOrUserId(String Password,String UserId);


}