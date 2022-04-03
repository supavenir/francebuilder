package com.thomasleconte.francebuilder.data.dto;

import lombok.Data;

@Data
public class ParrainageDto {
    private UserDto parraineur;
    private UserDto filleul;
}
