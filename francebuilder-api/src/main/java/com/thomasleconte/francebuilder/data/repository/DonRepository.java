package com.thomasleconte.francebuilder.data.repository;

import com.thomasleconte.francebuilder.data.entity.Don;
import com.thomasleconte.francebuilder.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonRepository extends JpaRepository<Don, Integer> {

    public List<Don> getAllByUser(User user);
}
