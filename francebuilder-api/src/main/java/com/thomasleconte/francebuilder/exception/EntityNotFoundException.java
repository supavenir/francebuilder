package com.thomasleconte.francebuilder.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class EntityNotFoundException extends ParentException {

    public EntityNotFoundException(String code, String message) {
        super(code, message);
    }
}
