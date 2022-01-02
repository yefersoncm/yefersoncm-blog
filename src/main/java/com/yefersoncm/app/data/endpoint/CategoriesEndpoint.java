package com.yefersoncm.app.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.entity.Category;
import com.yefersoncm.app.data.service.CategoriesService;
import java.util.Optional;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Endpoint
@AnonymousAllowed
public class CategoriesEndpoint {

    private CategoriesService service;

    public CategoriesEndpoint(@Autowired CategoriesService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull Category> list(Pageable page) {
        return service.list(page);
    }

    @Nonnull
    public List<@Nonnull Category> listAll() {
        return service.listAll();
    }

    public Optional<Category> get(@Nonnull Integer id) {
        return service.get(id);
    }

    @Nonnull
    public Category update(@Nonnull Category entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull Integer id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
