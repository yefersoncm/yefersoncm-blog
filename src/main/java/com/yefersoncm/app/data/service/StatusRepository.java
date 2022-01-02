package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Integer> {

}