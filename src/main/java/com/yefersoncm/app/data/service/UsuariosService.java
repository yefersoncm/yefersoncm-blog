package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Usuarios;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UsuariosService {

    private UsuariosRepository repository;

    public UsuariosService(@Autowired UsuariosRepository repository) {
        this.repository = repository;
    }

    public Optional<Usuarios> get(Integer id) {
        return repository.findById(id);
    }

    public Usuarios update(Usuarios entity) {
        return repository.save(entity);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Page<Usuarios> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public int count() {
        return (int) repository.count();
    }

}
