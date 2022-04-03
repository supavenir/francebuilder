package com.thomasleconte.francebuilder.controller;

import com.thomasleconte.francebuilder.data.dto.ParrainageDto;
import com.thomasleconte.francebuilder.data.dto.TokenResponseDto;
import com.thomasleconte.francebuilder.data.dto.UserRegistrationDto;
import com.thomasleconte.francebuilder.data.entity.User;
import com.thomasleconte.francebuilder.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class UserController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> users(){
        return userService.getUsers();
    }

    @PostMapping("/signup")
    public TokenResponseDto register(@RequestBody @Valid UserRegistrationDto registration) throws Exception {
        return userService.registerUser(registration, passwordEncoder);
    }

}
