package com.yefersoncm.app.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.entity.Users;
import com.yefersoncm.app.data.service.UsersService;
import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Endpoint
@AnonymousAllowed
public class UsersEndpoint {

    private UsersService service;

    public UsersEndpoint(@Autowired UsersService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull Users> list(Pageable page) {
        return service.list(page);
    }

    @Nonnull
    public List<@Nonnull Users> listAll() {
        return service.listAll();
    }

    public Optional<Users> get(@Nonnull Integer id) {
        return service.get(id);
    }

    @Nonnull
    public Users update(@Nonnull Users entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull Integer id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
