package com.yefersoncm.app.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.entity.Rol;
import com.yefersoncm.app.data.service.RolesService;

import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Endpoint
@AnonymousAllowed
public class RolesEndpoint {
    private RolesService service;

    public RolesEndpoint(@Autowired RolesService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull Rol> list(Pageable page) {
        return service.list(page);
    }

    @Nonnull
    public List<@Nonnull Rol> listAll() {
        return service.listAll();
    }

    public Optional<Rol> get(@Nonnull Integer id) {
        return service.get(id);
    }

    @Nonnull
    public Rol update(@Nonnull Rol entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull Integer id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }
}
