package com.thomasleconte.francebuilder.service;

import com.thomasleconte.francebuilder.data.entity.User;
import com.thomasleconte.francebuilder.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserDetails> result = userRepository.findOneByUsername(username);
        return result.orElseThrow(() -> new Exception("Utilisateur introuvable avec l'identifiant suivant :" + username));
    }
}
