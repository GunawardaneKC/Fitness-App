package com.PAF_DS_15_Team.paf.service;

import java.util.List;
import java.util.Optional;

import com.PAF_DS_15_Team.paf.model.WorkoutPlan;

public interface WorkoutPlanService {

    List<WorkoutPlan> getAllWorkoutPlans();

    Optional<WorkoutPlan> getWorkoutPlanById(String id);

    WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan);

    WorkoutPlan updateWorkoutPlan(String workoutPlanId, WorkoutPlan workoutPlan);

    void deleteWorkoutPlan(String workoutPlanId);

} // Service interface for workout plans.
// Declares methods for CRUD operations on workout plans.
