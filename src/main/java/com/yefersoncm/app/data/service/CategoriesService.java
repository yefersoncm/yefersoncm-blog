package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Category;
import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoriesService {

    private CategoriesRepository repository;

    public CategoriesService(@Autowired CategoriesRepository repository) {
        this.repository = repository;
    }

    public Optional<Category> get(Integer id) {
        return repository.findById(id);
    }

    public Category update(Category entity) {
        return repository.save(entity);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Page<Category> list(Pageable pageable) {
        return repository.findAll(pageable);
    }
    
    public List<Category> listAll() {
        return repository.findAll();
    }

    public int count() {
        return (int) repository.count();
    }

}
