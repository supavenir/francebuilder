package com.thomasleconte.francebuilder.controller;

import com.thomasleconte.francebuilder.data.dto.DonDto;
import com.thomasleconte.francebuilder.data.dto.DonFormDto;
import com.thomasleconte.francebuilder.security.JwtProperties;
import com.thomasleconte.francebuilder.service.DonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/don")
public class DonController {

    private final DonService donService;

    @PostMapping("/new")
    public void registerNewDon(@RequestBody @Valid DonFormDto don){
        donService.registerNewDon(don);
    }

    @GetMapping("/historique")
    public List<DonDto> getDonsOfUser(){
        return donService.getDonsOfUser();
    }
}
