package com.thomasleconte.francebuilder.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.thomasleconte.francebuilder.data.dto.TokenResponseDto;
import com.thomasleconte.francebuilder.data.dto.UserWithParrainagesDto;
import com.thomasleconte.francebuilder.data.entity.User;
import com.thomasleconte.francebuilder.data.mapper.ParrainnageMapper;
import com.thomasleconte.francebuilder.data.mapper.UserMapper;
import com.thomasleconte.francebuilder.security.JwtDecoder;
import com.thomasleconte.francebuilder.security.JwtProperties;
import com.thomasleconte.francebuilder.service.ParrainageService;
import com.thomasleconte.francebuilder.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.util.*;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@RestController
@RequestMapping("/security")
@RequiredArgsConstructor
@Slf4j
public class SecurityController {

    private final HttpServletRequest httpServletRequest;
    private final UserService userService;
    private final ParrainageService parrainageService;
    private final UserMapper userMapper;

    @GetMapping("/refresh-token")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public TokenResponseDto refreshToken(){
        try{
            String token = httpServletRequest.getHeader("Authorization").replace(JwtProperties.TOKEN_PREFIX, "");
            DecodedJWT decoder = JWT.require(HMAC512(JwtProperties.SECRET.getBytes()))
                    .build()
                    .verify(token);
            User user = userService.loadUserByUsername(decoder.getSubject());

            JWTCreator.Builder builder = JWT.create().withSubject(user.getUsername());

            for (Map.Entry<String, Claim> entry : decoder.getClaims().entrySet() ) {
                builder = builder.withClaim(entry.getKey(), entry.getValue().asString());
            }

            Map<String, List<String>> payload = new HashMap<>();
            payload.put("ROLES", user.getRoles());

            builder = builder.withPayload(payload)
                    .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME));

            return new TokenResponseDto(builder.sign(HMAC512(JwtProperties.SECRET.getBytes())));
        }catch (Exception e){
            throw e;
        }
    }

    @GetMapping("/me")
    public UserWithParrainagesDto getProfile(){
        String username = new JwtDecoder(httpServletRequest.getHeader("Authorization").replace(JwtProperties.TOKEN_PREFIX, ""))
                .getUser();
        User user = userService.loadUserByUsername(username);
        UserWithParrainagesDto result = new UserWithParrainagesDto();
        result.setUser(userMapper.toDestination(user));
        result.setParrainages(parrainageService.getParrainagesOfUser(user));
        return result;
    }
}

