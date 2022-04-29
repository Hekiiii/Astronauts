package com.traineetask.Astronauts.service;

import com.traineetask.Astronauts.model.AstronautModel;
import com.traineetask.Astronauts.repository.AstronautRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AstronautService {

    @Autowired
    AstronautRepository astronautRepository;

    public AstronautService() {

    }

    public List<AstronautModel> getAstronauts() {
        return astronautRepository.findAll();
    }

    public AstronautModel saveAstronaut(AstronautModel astronautModel) {
        return astronautRepository.save(astronautModel);
    }

    public void deleteAstronaut(Long id) {
        astronautRepository.deleteById(id);
    }
}
