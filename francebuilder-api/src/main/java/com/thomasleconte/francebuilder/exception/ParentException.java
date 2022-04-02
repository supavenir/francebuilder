package com.thomasleconte.francebuilder.exception;

public class ParentException extends RuntimeException {
    private String code;

    public ParentException(String code, String message) {
        super(message);
        this.code = code;
    }
}
