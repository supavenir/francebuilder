package com.thomasleconte.francebuilder.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EntityAlreadyExistsException extends ParentException {

    public EntityAlreadyExistsException(String code, String message) {
        super(code, message);
    }
}
