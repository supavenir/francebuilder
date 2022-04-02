package com.thomasleconte.francebuilder.data.repository;

import com.thomasleconte.francebuilder.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findOneByUsername(String username);

    Optional<User> findOneByEmail(String email);

    Optional<User> findOneByCodeParrain(String codeParrain);
}
