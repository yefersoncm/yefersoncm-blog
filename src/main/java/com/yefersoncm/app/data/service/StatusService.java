package com.yefersoncm.app.data.service;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.yefersoncm.app.data.entity.Status;
import java.util.Optional;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Service
public class StatusService {

    private StatusRepository repository;

    public StatusService(@Autowired StatusRepository repository) {
        this.repository = repository;
    }

    public Optional<Status> get(Integer id) {
        return repository.findById(id);
    }

    public Status update(Status entity) {
        return repository.save(entity);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public Page<Status> list(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public int count() {
        return (int) repository.count();
    }

    public List<Status> listAll() {
        return repository.findAll();
}
}
