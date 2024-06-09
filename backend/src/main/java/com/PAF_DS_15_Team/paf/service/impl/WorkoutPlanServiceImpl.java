package com.PAF_DS_15_Team.paf.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF_DS_15_Team.paf.model.User;
import com.PAF_DS_15_Team.paf.model.WorkoutPlan;
import com.PAF_DS_15_Team.paf.repo.UserRepository;
import com.PAF_DS_15_Team.paf.repo.WorkoutPlanRepository;
import com.PAF_DS_15_Team.paf.service.WorkoutPlanService;
// Implementation of WorkoutPlanService interface.
// Contains the logic for CRUD operations on workout plans.
@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private UserRepository userRepository;

     // Retrieves all workout plans.
    @Override
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

     // Retrieves a workout plan by its ID.
    @Override
    public Optional<WorkoutPlan> getWorkoutPlanById(String id) {
        return workoutPlanRepository.findById(id);
    }

     // Creates a new workout plan.
    @Override
    public WorkoutPlan createWorkoutPlan(WorkoutPlan workoutPlan) {
        Optional<User> userOptional = userRepository.findById(workoutPlan.getUserId());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            workoutPlan.setUserId(user.getId());
            workoutPlan.setUsername(user.getName());
            workoutPlan.setUserProfile(user.getProfileImage());
            return workoutPlanRepository.save(workoutPlan);
        } else {
            return null;
        }
        
    }

     // Updates an existing workout plan.
    @Override
    public WorkoutPlan updateWorkoutPlan(String workoutPlanId, WorkoutPlan workoutPlan) {
        if (workoutPlanRepository.existsById(workoutPlanId)) {
            Optional<User> userOptional = userRepository.findById(workoutPlan.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                workoutPlan.setUserId(user.getId());
                workoutPlan.setUsername(user.getName());
                workoutPlan.setUserProfile(user.getProfileImage());
                workoutPlan.setWorkoutPlanId(workoutPlanId);
                workoutPlan.setWorkoutPlanName(workoutPlan.getWorkoutPlanName());
                workoutPlan.setSets(workoutPlan.getSets());
                workoutPlan.setRoutine(workoutPlan.getRoutine());
                workoutPlan.setDate(workoutPlan.getDate());
                workoutPlan.setExercises(workoutPlan.getExercises());
                workoutPlan.setRepetitions(workoutPlan.getRepetitions());
                workoutPlan.setDescription(workoutPlan.getDescription());
                return workoutPlanRepository.save(workoutPlan);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

     // Deletes a workout plan by its ID.
    @Override
    public void deleteWorkoutPlan(String workoutPlanId) {
        workoutPlanRepository.deleteById(workoutPlanId);
    }

}
