package com.thomasleconte.francebuilder.service;

import com.thomasleconte.francebuilder.data.dto.DonDto;
import com.thomasleconte.francebuilder.data.dto.DonFormDto;
import com.thomasleconte.francebuilder.data.entity.Don;
import com.thomasleconte.francebuilder.data.entity.User;
import com.thomasleconte.francebuilder.data.mapper.DonMapper;
import com.thomasleconte.francebuilder.data.repository.DonRepository;
import com.thomasleconte.francebuilder.data.repository.UserRepository;
import com.thomasleconte.francebuilder.exception.EntityNotFoundException;
import com.thomasleconte.francebuilder.security.JwtDecoder;
import com.thomasleconte.francebuilder.security.JwtProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DonService {

    private final HttpServletRequest httpServletRequest;
    private final DonRepository donRepository;
    private final UserRepository userRepository;
    private final DonMapper donMapper;

    public void registerNewDon(DonFormDto don) {
        String user = JwtDecoder.getUser(httpServletRequest.getHeader("Authorization").replace(JwtProperties.TOKEN_PREFIX, ""));
        Don result = new Don();
        result.setMontant(don.getMontant());
        result.setCommentaire(don.getCommentaire());
        result.setDate(don.getDate());
        result.setUser(userRepository.findOneByUsername(user)
                .orElseThrow(() -> new EntityNotFoundException("USER_NOT_FOUND", String.format("L'utilisateur %s n'existe pas !", user))));
        donRepository.save(result);
    }

    public List<DonDto> getDonsOfUser() {
        String tokenUser = JwtDecoder.getUser(httpServletRequest.getHeader("Authorization").replace(JwtProperties.TOKEN_PREFIX, ""));
        User user = userRepository.findOneByUsername(tokenUser)
                .orElseThrow(() -> new EntityNotFoundException("USER_NOT_FOUND", String.format("L'utilisateur %s n'existe pas !", tokenUser)));
        return donMapper.toDestination(donRepository.getAllByUser(user));
    }
}
