package com.PAF_DS_15_Team.paf.service;

import java.util.List;
import java.util.Optional;

import com.PAF_DS_15_Team.paf.model.WorkoutStatus;

// Interface defining methods to manage workout statuses
public interface WorkoutStatusService {

    // Method to retrieve all workout statuses
    List<WorkoutStatus> getAllWorkoutStatus();

    // Method to retrieve a workout status by its ID
    Optional<WorkoutStatus> getWorkoutStatsusById(String statusId);

    // Method to create a new workout status
    WorkoutStatus createWorkoutStatus(WorkoutStatus workoutStatus);

    // Method to update an existing workout status
    WorkoutStatus updateWorkoutStatus(String statusId, WorkoutStatus workoutStatus);

    // Method to delete a workout status by its ID
    void deleteWorkoutStatus(String statusId);
}
