package com.traineetask.Astronauts.service;

import com.traineetask.Astronauts.model.AstronautModel;
import com.traineetask.Astronauts.repository.AstronautRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AstronautService {

    @Autowired
    AstronautRepository astronautRepository;

    //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public AstronautService() {

    }

    public List<AstronautModel> getAstronauts() {
        return astronautRepository.findAll();
    }

    public AstronautModel saveAstronaut(AstronautModel astronautModel) {
        //astronautModel.setBirthdate(LocalDateTime.now());
        return astronautRepository.save(astronautModel);
    }

    public void deleteAstronaut(Long id) {
        astronautRepository.deleteById(id);
    }
}
