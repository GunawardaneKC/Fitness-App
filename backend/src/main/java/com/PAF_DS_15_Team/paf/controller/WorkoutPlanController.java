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

import com.PAF_DS_15_Team.paf.model.WorkoutPlan;
import com.PAF_DS_15_Team.paf.service.WorkoutPlanService;

// This controller class handles HTTP requests related to workout plans.
// It maps incoming requests to appropriate methods in the service layer and returns responses.
@RestController
@RequestMapping("/workoutPlans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    // Retrieves all workout plans.
    @GetMapping
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanService.getAllWorkoutPlans();
    }

       // Retrieves a specific workout plan by its ID.
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutPlan> getWorkoutPlanById(@PathVariable String id) {
        Optional<WorkoutPlan> workoutPlans = workoutPlanService.getWorkoutPlanById(id);
        return workoutPlans.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Creates a new workout plan.
    @PostMapping
    public ResponseEntity<WorkoutPlan> createWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        WorkoutPlan savedWorkoutPlan = workoutPlanService.createWorkoutPlan(workoutPlan);
        return new ResponseEntity<>(savedWorkoutPlan, HttpStatus.CREATED);
    }
// Updates an existing workout plan.
    @PutMapping("/{id}")
    public ResponseEntity<WorkoutPlan> updateWorkout(@PathVariable String id,
                                                     @RequestBody WorkoutPlan workoutPlan) {
        WorkoutPlan updatedWorkoutPlan = workoutPlanService.updateWorkoutPlan(id, workoutPlan);
        if (updatedWorkoutPlan != null) {
            return new ResponseEntity<>(updatedWorkoutPlan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

      // Deletes a workout plan by its ID.
    @DeleteMapping("/{workoutPlanId}")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable String workoutPlanId) {
        workoutPlanService.deleteWorkoutPlan(workoutPlanId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


/*GET /workoutPlans: Retrieves all workout plans.
GET /workoutPlans/{id}: Retrieves a specific workout plan by ID.
POST /workoutPlans: Creates a new workout plan.
PUT /workoutPlans/{id}: Updates an existing workout plan by ID.
DELETE /workoutPlans/{id}: Deletes a specific workout plan by ID.*/