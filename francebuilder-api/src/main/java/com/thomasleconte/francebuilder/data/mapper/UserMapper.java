package com.thomasleconte.francebuilder.data.mapper;

import com.thomasleconte.francebuilder.data.dto.UserDto;
import com.thomasleconte.francebuilder.data.entity.User;
import org.mapstruct.Mapper;

@Mapper(config = MapStructConfig.class, uses = {})
public interface UserMapper extends BaseMapper<User, UserDto> {

    UserDto toDestination(User obj);

    User toSource(UserDto obj);
}
