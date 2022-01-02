package com.yefersoncm.app.data.entity;

import com.vaadin.fusion.Nonnull;
import com.yefersoncm.app.data.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(initialValue = 1, name = "idgen", sequenceName = "categoria_seq", allocationSize = 1)
public class Category extends AbstractEntity{

    @Nonnull
    private String name;

    @Nonnull
    private String description;
    
    @Nonnull
    private String icon;
    
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

    /**
     * @return String return the icon
     */
    public String getIcon() {
        return icon;
    }

    /**
     * @param icon the icon to set
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }

}
