package com.yefersoncm.app.data.entity;

import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;


@Entity
@SequenceGenerator(initialValue = 1, name = "idgen", sequenceName = "status_seq", allocationSize = 1)
public class Status extends AbstractEntity{
    @Nonnull
    private String name;


    @Nonnull
    private String description;


    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
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

}
