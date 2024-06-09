package com.PAF_DS_15_Team.paf.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.PAF_DS_15_Team.paf.model.WorkoutPlan;

@Repository
public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan, String> {

}
// Repository interface for workout plans.
// Extends MongoRepository for CRUD operations on workout plans.