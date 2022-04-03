package com.thomasleconte.francebuilder.service;

import com.thomasleconte.francebuilder.data.dto.ParrainageDto;
import com.thomasleconte.francebuilder.data.entity.User;
import com.thomasleconte.francebuilder.data.mapper.ParrainnageMapper;
import com.thomasleconte.francebuilder.data.repository.ParrainageRepository;
import com.thomasleconte.francebuilder.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ParrainageService {

    private final ParrainageRepository parrainageRepository;
    private final ParrainnageMapper parrainnageMapper;

    public List<ParrainageDto> getParrainagesOfUser(User user){
        return parrainnageMapper.toDestination(parrainageRepository.findAllByParraineur(user));
    }
}
