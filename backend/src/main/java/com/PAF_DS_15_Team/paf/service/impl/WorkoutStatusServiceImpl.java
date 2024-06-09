package com.PAF_DS_15_Team.paf.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF_DS_15_Team.paf.model.User;
import com.PAF_DS_15_Team.paf.model.WorkoutStatus;
import com.PAF_DS_15_Team.paf.repo.UserRepository;
import com.PAF_DS_15_Team.paf.repo.WorkoutStatusRepository;
import com.PAF_DS_15_Team.paf.service.WorkoutStatusService;

// Annotation indicating that this class is a service component managed by Spring
@Service
public class WorkoutStatusServiceImpl implements WorkoutStatusService {

    // Auto-wiring to inject WorkoutStatusRepository instance
    @Autowired
    private WorkoutStatusRepository workoutStatusRepository;

    // Auto-wiring to inject UserRepository instance
    @Autowired
    private UserRepository userRepository;

    // Method to retrieve all workout statuses
    @Override
    public List<WorkoutStatus> getAllWorkoutStatus() {
        return workoutStatusRepository.findAll();
    }

    // Method to retrieve a workout status by its ID
    @Override
    public Optional<WorkoutStatus> getWorkoutStatsusById(String statusId) {
        return workoutStatusRepository.findById(statusId);
    }

    // Method to create a new workout status
    @Override
    public WorkoutStatus createWorkoutStatus(WorkoutStatus workoutStatus) {
        // Check if the associated user exists
        Optional<User> userOptional = userRepository.findById(workoutStatus.getUserId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Set user details in the workout status
            workoutStatus.setUserId(user.getId());
            workoutStatus.setUsername(user.getName());
            workoutStatus.setUserProfile(user.getProfileImage());
            // Save the workout status
            return workoutStatusRepository.save(workoutStatus);
        } else {
            // If user not found, return null
            return null;
        }
    }

    // Method to update an existing workout status
    @Override
    public WorkoutStatus updateWorkoutStatus(String statusId, WorkoutStatus workoutStatus) {
        // Check if the workout status exists
        if (workoutStatusRepository.existsById(statusId)) {
            Optional<User> userOptional = userRepository.findById(workoutStatus.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                // Set user details in the workout status
                workoutStatus.setUserId(user.getId());
                workoutStatus.setUsername(user.getName());
                workoutStatus.setUserProfile(user.getProfileImage());
                workoutStatus.setStatusId(statusId); // Set status ID
                // Update workout status details
                workoutStatus.setDistance(workoutStatus.getDistance());
                workoutStatus.setPushUps(workoutStatus.getPushUps());
                workoutStatus.setWeight(workoutStatus.getWeight());
                workoutStatus.setDescription(workoutStatus.getDescription());
                workoutStatus.setDate(workoutStatus.getDate());
                // Save the updated workout status
                return workoutStatusRepository.save(workoutStatus);
            } else {
                // If user not found, return null
                return null;
            }
        } else {
            // If workout status not found, return null
            return null;
        }
    }

    // Method to delete a workout status by its ID
    @Override
    public void deleteWorkoutStatus(String statusId) {
        workoutStatusRepository.deleteById(statusId);
    }
}
