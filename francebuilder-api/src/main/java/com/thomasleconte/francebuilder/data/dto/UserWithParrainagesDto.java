package com.thomasleconte.francebuilder.data.dto;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class UserWithParrainagesDto {
    private UserDto user;
    private List<ParrainageDto> parrainages;
}
