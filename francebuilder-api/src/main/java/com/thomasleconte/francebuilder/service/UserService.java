package com.thomasleconte.francebuilder.service;

import com.thomasleconte.francebuilder.data.dto.TokenResponseDto;
import com.thomasleconte.francebuilder.data.dto.UserRegistrationDto;
import com.thomasleconte.francebuilder.data.entity.Parrainnage;
import com.thomasleconte.francebuilder.data.entity.User;
import com.thomasleconte.francebuilder.data.repository.ParrainageRepository;
import com.thomasleconte.francebuilder.data.repository.UserRepository;
import com.thomasleconte.francebuilder.exception.EntityAlreadyExistsException;
import com.thomasleconte.francebuilder.exception.EntityNotFoundException;
import com.thomasleconte.francebuilder.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ParrainageRepository parrainageRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @SneakyThrows
    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> result = userRepository.findOneByUsername(username);
        return result.orElseThrow(() -> new Exception("Utilisateur introuvable avec l'identifiant suivant :" + username));
    }

    public TokenResponseDto registerUser(UserRegistrationDto registration, BCryptPasswordEncoder passwordEncoder) throws Exception {
        User parrain = null;
        if(userRepository.findOneByUsername(registration.getUsername()).isPresent()){
            throw new EntityAlreadyExistsException("USERNAME_ALREADY_USED",
                    "Un compte avec l'identifiant " + registration.getUsername() + " existe déjà !");
        }

        if(userRepository.findOneByEmail(registration.getEmail()).isPresent()){
            throw new EntityAlreadyExistsException("EMAIL_ALREADY_USED",
                    "Un compte existe déjà avec cette adresse email !");
        }

        if(registration.getCodeParrain() != null){
            Optional<User> potentialParrain = userRepository.findOneByCodeParrain(registration.getCodeParrain());
            if(!potentialParrain.isPresent()){
                throw new EntityNotFoundException("CODE_PARRAIN_NOT_FOUND", "Le code parrain " + registration.getCodeParrain() + "n'existe pas.");
            }
            parrain = potentialParrain.get();
        }

        User user = new User();
        user.setNom(registration.getLastname());
        user.setPrenom(registration.getFirstname());
        user.setEmail(registration.getEmail());
        user.setUsername(registration.getUsername());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setCodeParrain("#" + UUID.randomUUID().toString().substring(0, 5).toUpperCase());
        user.setDescriptif(null);
        user.setNomEntreprise(null);
        user.setNumero(null);
        user = initUserSecurityContext(user);

        user = userRepository.save(user);
        if(parrain != null){
            Parrainnage parrainnage = new Parrainnage();
            parrainnage.setParraineur(parrain);
            parrainnage.setFilleul(user);
            parrain.addParrainage(parrainnage);
            parrainageRepository.save(parrainnage);

            user.setParraineur(parrain);
            userRepository.save(user);
        }

        return new TokenResponseDto(JwtAuthenticationFilter.generateJwtToken(user));
    }

    private User initUserSecurityContext(User user){
        user.setRoles("SYMPATHISANT;");
        user.setEnabled(true);
        user.setAccountNotExpired(true);
        user.setAccountNotLocked(true);
        user.setCredentialNonExpired(true);
        return user;
    }
}
