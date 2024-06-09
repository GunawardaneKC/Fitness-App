package com.PAF_DS_15_Team.paf.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.PAF_DS_15_Team.paf.model.MealPlan;

@Repository
public interface MealPlanRepository extends MongoRepository<MealPlan, String> {

}
