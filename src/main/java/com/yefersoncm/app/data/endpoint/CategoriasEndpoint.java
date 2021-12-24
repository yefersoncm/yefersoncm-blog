package com.yefersoncm.app.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.entity.Categorias;
import com.yefersoncm.app.data.service.CategoriasService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Endpoint
@AnonymousAllowed
public class CategoriasEndpoint {

    private CategoriasService service;

    public CategoriasEndpoint(@Autowired CategoriasService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull Categorias> list(Pageable page) {
        return service.list(page);
    }

    public Optional<Categorias> get(@Nonnull Integer id) {
        return service.get(id);
    }

    @Nonnull
    public Categorias update(@Nonnull Categorias entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull Integer id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
