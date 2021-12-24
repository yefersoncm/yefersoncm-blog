package com.yefersoncm.app.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.entity.Posts;
import com.yefersoncm.app.data.service.PostsService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Endpoint
@AnonymousAllowed
public class PostsEndpoint {

    private PostsService service;

    public PostsEndpoint(@Autowired PostsService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull Posts> list(Pageable page) {
        return service.list(page);
    }

    public Optional<Posts> get(@Nonnull Integer id) {
        return service.get(id);
    }

    @Nonnull
    public Posts update(@Nonnull Posts entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull Integer id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
