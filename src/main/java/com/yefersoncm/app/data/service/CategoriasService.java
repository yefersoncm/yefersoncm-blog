package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Categorias;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoriasService {

    private CategoriasRepository repository;

    public CategoriasService(@Autowired CategoriasRepository repository) {
        this.repository = repository;
    }

    public Optional<Categorias> get(Integer id) {
        return repository.findById(id);
    }

    public Categorias update(Categorias entity) {
        return repository.save(entity);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Page<Categorias> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public int count() {
        return (int) repository.count();
    }

}
