package com.PAF_DS_15_Team.paf.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


// WorkoutPlan model class represents the structure of a workout plan.
// It is annotated with Spring Data MongoDB annotations for mapping with the database.

@Document(collection = "workoutPlans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutPlan {

     // ID field annotated as MongoDB ID.
    @Id
    private String workoutPlanId;
      // Other fields representing various attributes of a workout plan.
    private String userId;
    private String workoutPlanName;
    private String exercises;
    private int sets;
    private int repetitions;
    private String routine;
    private String description;
    private String date;
    private String username;
    private String userProfile;
}
