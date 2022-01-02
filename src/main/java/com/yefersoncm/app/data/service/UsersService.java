package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Users;
import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private UsersRepository repository;

    public UsersService(@Autowired UsersRepository repository) {
        this.repository = repository;
    }

    public Optional<Users> get(Integer id) {
        return repository.findById(id);
    }

    public Users update(Users entity) {
        return repository.save(entity);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Page<Users> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public int count() {
        return (int) repository.count();
    }

    public List<Users> listAll() {
        return repository.findAll();
    }

    public Users getUserByEmail(String email){
        return repository.findByEmail(email);
    }

}
