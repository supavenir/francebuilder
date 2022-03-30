package com.thomasleconte.francebuilder.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.thomasleconte.francebuilder.security.JwtProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
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

    @GetMapping("/refresh-token")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public TokenResponse refreshToken(){
        try{

            //TODO hydrater les roles


            String token = httpServletRequest.getHeader("Authorization").replace(JwtProperties.TOKEN_PREFIX, "");
            DecodedJWT decoder = JWT.require(HMAC512(JwtProperties.SECRET.getBytes()))
                    .build()
                    .verify(token);
            JWTCreator.Builder builder = JWT.create();
            for (Map.Entry<String, Claim> entry : decoder.getClaims().entrySet() ) {
                builder = builder.withClaim(entry.getKey(), entry.getValue().asString());
            }

            Map<String, List<String>> payload = new HashMap<>();
            List<String> roles = Arrays.asList("USER", "PARRAIN");
            payload.put("ROLES", roles);

            builder = builder.withPayload(payload)
                    .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME));
            return new TokenResponse(builder.sign(HMAC512(JwtProperties.SECRET.getBytes())));
        }catch (Exception e){
            throw e;
        }
    }
}

@Data
@AllArgsConstructor
class TokenResponse {
    private String token;
}
