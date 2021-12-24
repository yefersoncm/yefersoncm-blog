package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts, Integer> {

}