package com.thomasleconte.francebuilder.data.mapper;

import com.thomasleconte.francebuilder.data.dto.ParrainageDto;
import com.thomasleconte.francebuilder.data.entity.Parrainnage;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class, uses = {UserMapper.class})
public interface ParrainnageMapper extends BaseMapper<Parrainnage, ParrainageDto> {
    @Override
    ParrainageDto toDestination(Parrainnage obj);

    @Override
    Parrainnage toSource(ParrainageDto obj);
}
