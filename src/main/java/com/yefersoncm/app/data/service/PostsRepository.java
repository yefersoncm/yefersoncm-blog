package com.yefersoncm.app.data.service;


import java.util.List;

import com.yefersoncm.app.data.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface PostsRepository extends JpaRepository<Post, Integer> {
    @Query(
    value = "SELECT * FROM post u WHERE u.status_id = 4", nativeQuery = true)
    List<Post> findPublished();

}