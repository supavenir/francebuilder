package com.thomasleconte.francebuilder.data.mapper;

import org.mapstruct.Builder;
import org.mapstruct.MapperConfig;

@MapperConfig(componentModel = "spring", disableSubMappingMethodsGeneration = true, builder = @Builder (disableBuilder = true))
public class MapStructConfig {
}
