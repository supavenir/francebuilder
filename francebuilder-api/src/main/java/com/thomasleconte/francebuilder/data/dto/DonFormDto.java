package com.thomasleconte.francebuilder.data.dto;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class DonFormDto {

    @NotNull
    private int montant;
    @Nullable
    private String commentaire;
    @NotNull
    private LocalDateTime date;
}
