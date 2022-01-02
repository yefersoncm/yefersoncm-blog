package com.yefersoncm.app.data.entity;

import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.AbstractEntity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.ManyToOne;

@Entity
@SequenceGenerator(initialValue = 1, name = "idgen", sequenceName = "post_seq", allocationSize = 1)
public class Post extends AbstractEntity{

    @Nonnull
    private String title;

    @Nonnull
    private String description;

    @Nonnull
    private String tags;

    @Nonnull
    @Lob
    private String body;

    @Nonnull
    private String imagepath;

    @ManyToOne
    @Nonnull
    private Users author;

    @ManyToOne
    @Nonnull
    private Category category;

    @ManyToOne
    @Nonnull
    private Status status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

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
     * @return String return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return String return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return String return the tags
     */
    public String getTags() {
        return tags;
    }

    /**
     * @param tags the tags to set
     */
    public void setTags(String tags) {
        this.tags = tags;
    }

    /**
     * @return String return the body
     */
    public String getBody() {
        return body;
    }

    /**
     * @param body the body to set
     */
    public void setBody(String body) {
        this.body = body;
    }

    /**
     * @return String return the imagepath
     */
    public String getImagepath() {
        return imagepath;
    }

    /**
     * @param imagepath the imagepath to set
     */
    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    /**
     * @return Users return the author
     */
    public Users getAuthor() {
        return author;
    }

    /**
     * @param author the author to set
     */
    public void setAuthor(Users author) {
        this.author = author;
    }

    /**
     * @return Status return the status
     */
    public Status getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(Status status) {
        this.status = status;
    }


    /**
     * @return Category return the category
     */
    public Category getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(Category category) {
        this.category = category;
    }

}
