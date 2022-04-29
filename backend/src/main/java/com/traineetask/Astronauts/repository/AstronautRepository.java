package com.traineetask.Astronauts.repository;

import com.traineetask.Astronauts.model.AstronautModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AstronautRepository extends JpaRepository<AstronautModel, Long> {
}
