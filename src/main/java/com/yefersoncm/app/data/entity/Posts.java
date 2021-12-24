package com.yefersoncm.app.data.entity;

import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.AbstractEntity;
import java.time.LocalDateTime;
import javax.persistence.Entity;

@Entity
public class Posts extends AbstractEntity {

    @Nonnull
    private String titulo;
    @Nonnull
    private String descripcion;
    @Nonnull
    private String tags;
    @Nonnull
    private String texto;
    @Nonnull
    private String imagenPrincipal;
    @Nonnull
    private String categoria;
    @Nonnull
    private Integer estado;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public String getTags() {
        return tags;
    }
    public void setTags(String tags) {
        this.tags = tags;
    }
    public String getTexto() {
        return texto;
    }
    public void setTexto(String texto) {
        this.texto = texto;
    }
    public String getImagenPrincipal() {
        return imagenPrincipal;
    }
    public void setImagenPrincipal(String imagenPrincipal) {
        this.imagenPrincipal = imagenPrincipal;
    }
    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public Integer getEstado() {
        return estado;
    }
    public void setEstado(Integer estado) {
        this.estado = estado;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

}
