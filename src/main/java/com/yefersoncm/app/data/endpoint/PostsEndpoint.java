package com.yefersoncm.app.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.fusion.Endpoint;
import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.entity.Post;
import com.yefersoncm.app.data.service.PostsService;
import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Endpoint
@AnonymousAllowed
@RestController
public class PostsEndpoint {

    private PostsService service;

    public PostsEndpoint(@Autowired PostsService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull Post> list(Pageable page) {
        return service.list(page);
    }

    @Nonnull
    public List<@Nonnull Post> listAll() {
        return service.listAll();
    }

    @Nonnull
    public List<@Nonnull Post> listPublished() {
        return service.listPublished();
    }

    public Optional<Post> get(@Nonnull Integer id) {
        return service.get(id);
    }

    @Nonnull
    public Post update(@Nonnull Post entity) {

        String path = "/Users/yocordoba/ImagePosts/images/LastImagePost.png";
        File file = new File(path);
        File file2 = new File("/Users/yocordoba/ImagePosts/images/"+entity.getId()+".png");
        if(file.exists()){
            file.renameTo(file2);
            file.delete();
        }
        return service.update(entity);
    }

    public void delete(@Nonnull Integer id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

    @PostMapping("/api/fileupload")
    public void handleFileUpload(@RequestParam("file") MultipartFile uploadedFile) throws IOException {
        File file = new File("/Users/yocordoba/ImagePosts/images/LastImagePost.png");
        uploadedFile.transferTo(file);
    }

}
