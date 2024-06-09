package com.PAF_DS_15_Team.paf.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF_DS_15_Team.paf.model.WorkoutStatus;
import com.PAF_DS_15_Team.paf.service.WorkoutStatusService;

// Controller class for handling WorkoutStatus related endpoints
@RestController
@RequestMapping("/workoutStatus")
public class WorkoutStatusController {

    // Autowiring the WorkoutStatusService to handle business logic
    @Autowired
    private WorkoutStatusService workoutStatusService;

    // Endpoint to retrieve all WorkoutStatus entries
    @GetMapping
    public List<WorkoutStatus> getAllWorkoutStatus() {
        return workoutStatusService.getAllWorkoutStatus();
    }

    // Endpoint to retrieve a WorkoutStatus entry by its ID
    @GetMapping("/{statusId}")
    public ResponseEntity<WorkoutStatus> getWorkoutstatusById(@PathVariable String statusId) {
        Optional<WorkoutStatus> workoutStatus = workoutStatusService.getWorkoutStatsusById(statusId);
        // Return 200 OK with the WorkoutStatus if found, or 404 NOT FOUND
        return workoutStatus.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Endpoint to create a new WorkoutStatus entry
    @PostMapping
    public ResponseEntity<WorkoutStatus> createWorkoutStatus(@RequestBody WorkoutStatus workoutStatus) {
        // Save the WorkoutStatus and return 201 CREATED with the saved WorkoutStatus
        WorkoutStatus savedWorkoutStatus = workoutStatusService.createWorkoutStatus(workoutStatus);
        return new ResponseEntity<>(savedWorkoutStatus, HttpStatus.CREATED);
    }

    // Endpoint to update an existing WorkoutStatus entry by its ID
    @PutMapping("/{statusId}")
    public ResponseEntity<WorkoutStatus> updateWorkoutStatus(@PathVariable String statusId,
            @RequestBody WorkoutStatus workoutStatus) {
        // Update the WorkoutStatus if found, return 200 OK with the updated WorkoutStatus,
        // or return 404 NOT FOUND if not found
        WorkoutStatus updateWorkoutStatus = workoutStatusService.updateWorkoutStatus(statusId, workoutStatus);
        if (updateWorkoutStatus != null) {
            return new ResponseEntity<>(updateWorkoutStatus, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete a WorkoutStatus entry by its ID
    @DeleteMapping("/{statusId}")
    public ResponseEntity<Void> deleteWorkoutStatus(@PathVariable String statusId) {
        // Delete the WorkoutStatus and return 204 NO CONTENT
        workoutStatusService.deleteWorkoutStatus(statusId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
