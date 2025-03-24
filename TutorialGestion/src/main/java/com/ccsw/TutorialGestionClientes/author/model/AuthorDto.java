package com.ccsw.TutorialGestionClientes.author.model;

import jakarta.validation.constraints.NotEmpty;

/**
 * @author ccsw
 *
 */
public class AuthorDto {

    private Long id;

    @NotEmpty(message = "Name cannot be null or empty")
    private String name;

    private String nationality;

    // Getters and setters
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNationality() {
        return this.nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
}