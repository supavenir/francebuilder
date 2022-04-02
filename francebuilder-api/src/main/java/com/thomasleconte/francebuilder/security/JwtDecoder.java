package com.thomasleconte.francebuilder.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JwtDecoder {

    private String token;
    private DecodedJWT decoder;

    public JwtDecoder(String token) {
        this.token = token;
        this.decoder = JWT.require(HMAC512(JwtProperties.SECRET.getBytes()))
                .build()
                .verify(token);
    }

    public String getUser(){
        return this.decoder.getClaim("USER").asString();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
