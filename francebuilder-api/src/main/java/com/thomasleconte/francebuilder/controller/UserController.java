package com.thomasleconte.francebuilder.controller;

import com.thomasleconte.francebuilder.data.entity.User;
import com.thomasleconte.francebuilder.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public List<User> users(){
        return userService.getUsers();
    }

}
