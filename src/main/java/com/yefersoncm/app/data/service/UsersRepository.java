package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;


public interface UsersRepository extends JpaRepository<Users, Integer> {
    // @Query("select c from usuarios c " +
    //         "where lower(c.nombres) like lower(concat('%', :searchTerm, '%')) " +
    //         "or lower(c.apellidos) like lower(concat('%', :searchTerm, '%'))")
    // List<Usuario> search(@Param("searchTerm") String searchTerm);
    Users findByEmail(String email);
}