package com.thomasleconte.francebuilder.data.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DonDto {

    private int montant;
    private String commentaire;
    private LocalDateTime date;
    private UserDto user;
}
