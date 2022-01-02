package com.yefersoncm.app.data.entity;

import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.AbstractEntity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Column;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@SequenceGenerator(initialValue = 1, name = "idgen", sequenceName = "users_seq", allocationSize = 1)
public class Users extends AbstractEntity{


    
    @Nonnull
    @NotBlank
    private String name;
    @Nonnull
    @NotBlank
    private String lastname;

    @Nonnull
    private String fullname;

    @Email
    @NotBlank
    @Nonnull
    private String email;

    private String phone;

    @Column(columnDefinition = "varchar(255) default 'f8032d5cae3de20fcec887f395ec9a6a'")//usuario
    private String password;
        
    private LocalDate dateofbirth;

    @ManyToOne
    @Nonnull
    private Rol rol;

    @Nonnull
    private boolean active;

    @Nonnull
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Nonnull
    @UpdateTimestamp
    private LocalDateTime updatedAt;



    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public LocalDate getDateofbirth() {
        return dateofbirth;
    }
    public void setDateofbirth(LocalDate dateofbirth) {
        this.dateofbirth = dateofbirth;
    }
    public Rol getRol() {
        return rol;
    }
    public void setRol(Rol rol) {
        this.rol = rol;
    }
    public boolean isActive() {
        return active;
    }
    public void setActive(boolean active) {
        this.active = active;
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

    /**
     * @return String return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }


    /**
     * @return String return the fullname
     */
    public String getFullname() {
        return fullname;
    }

    /**
     * @param fullname the fullname to set
     */
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

}
