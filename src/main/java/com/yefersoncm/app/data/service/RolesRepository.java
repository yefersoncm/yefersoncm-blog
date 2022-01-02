package com.yefersoncm.app.data.service;

import com.yefersoncm.app.data.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
// import java.util.List;

public interface RolesRepository extends JpaRepository<Rol, Integer> {
    // @Query("select c from rol c " +
    //         "where lower(c.nombre) like lower(concat('%', :searchTerm, '%')) " +
    //         "or lower(c.descripcion) like lower(concat('%', :searchTerm, '%'))")
    // List<Rol> search(@Param("searchTerm") String searchTerm);
}
