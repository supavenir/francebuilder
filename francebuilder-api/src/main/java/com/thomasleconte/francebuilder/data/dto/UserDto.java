package com.thomasleconte.francebuilder.data.dto;

import lombok.Data;
import lombok.ToString;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;

@Data
@ToString
public class UserDto {

    @Nullable
    private int id;

    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;

    @NotBlank
    private String username;

    @NotBlank
    private String numero;

    @NotBlank
    private String descriptif;

    @NotBlank
    private String nomEntreprise;
}
