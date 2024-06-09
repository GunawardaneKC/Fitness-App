package com.PAF_DS_15_Team.paf.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.PAF_DS_15_Team.paf.model.WorkoutStatus;

@Repository
public interface WorkoutStatusRepository extends MongoRepository<WorkoutStatus, String> {

}