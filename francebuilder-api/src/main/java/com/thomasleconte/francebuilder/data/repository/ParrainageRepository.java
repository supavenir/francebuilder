package com.thomasleconte.francebuilder.data.repository;

import com.thomasleconte.francebuilder.data.entity.Parrainnage;
import com.thomasleconte.francebuilder.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParrainageRepository extends JpaRepository<Parrainnage, Integer> {

    List<Parrainnage> findAllByParraineur(User parrain);
}
