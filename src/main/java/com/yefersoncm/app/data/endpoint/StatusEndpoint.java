package com.yefersoncm.app.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.entity.Status;
import com.yefersoncm.app.data.service.StatusService;
import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Endpoint
@AnonymousAllowed
public class StatusEndpoint {
    private StatusService service;

    public StatusEndpoint(@Autowired StatusService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull Status> list(Pageable page) {
        return service.list(page);
    }

    @Nonnull
    public List<@Nonnull Status> listAll() {
        return service.listAll();
    }

    public Optional<Status> get(@Nonnull Integer id) {
        return service.get(id);
    }

    @Nonnull
    public Status update(@Nonnull Status entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull Integer id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }
}
