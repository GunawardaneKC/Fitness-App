package com.PAF_DS_15_Team.paf.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "mealPlans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealPlan {

    @Id
    private String mealPlanId;
    private String userId;
    private String mealType;
    private String recipes;
    private String ingredients;
    private String cookingInstruction;
    private String nutritionalInformation;
    private String portionSizes;
    private String dietaryPreferences;
    private String source;
    private String date;
    private String username;
    private String userProfile;

}
