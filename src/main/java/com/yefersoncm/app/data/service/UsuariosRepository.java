package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {

}