package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Category, Integer> {

}