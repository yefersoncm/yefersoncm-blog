package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Posts;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PostsService {

    private PostsRepository repository;

    public PostsService(@Autowired PostsRepository repository) {
        this.repository = repository;
    }

    public Optional<Posts> get(Integer id) {
        return repository.findById(id);
    }

    public Posts update(Posts entity) {
        return repository.save(entity);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Page<Posts> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public int count() {
        return (int) repository.count();
    }

}
