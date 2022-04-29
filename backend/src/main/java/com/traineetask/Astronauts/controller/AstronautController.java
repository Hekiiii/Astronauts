package com.traineetask.Astronauts.controller;

import com.traineetask.Astronauts.model.AstronautModel;
import com.traineetask.Astronauts.service.AstronautService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AstronautController {

    @Autowired
    AstronautService astronautService;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @GetMapping("astronauts")
    public ResponseEntity<?> getAstronauts() {
        return new ResponseEntity<>(astronautService.getAstronauts(), HttpStatus.OK);
    }

    @PostMapping("astronauts")
    public ResponseEntity<?> saveAstronaut(@RequestBody AstronautModel astronautModel) {
        //astronautModel.setBirthdate(LocalDateTime.now());
        return new ResponseEntity<>(astronautService.saveAstronaut(astronautModel), HttpStatus.CREATED);
    }

    @DeleteMapping("astronauts/{id}")
    public ResponseEntity<?> deleteAstronaut(@PathVariable Long id) {
        astronautService.deleteAstronaut(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
