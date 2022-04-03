package com.thomasleconte.francebuilder.data.mapper;

import com.thomasleconte.francebuilder.data.dto.DonDto;
import com.thomasleconte.francebuilder.data.entity.Don;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class, uses = {UserMapper.class})
public interface DonMapper extends BaseMapper<Don, DonDto> {
    @Override
    DonDto toDestination(Don obj);

    @Override
    Don toSource(DonDto obj);
}
