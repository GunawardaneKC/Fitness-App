package com.PAF_DS_15_Team.paf.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Annotation to specify that this class represents a MongoDB document
@Document(collection = "workoutStatus")
// Lombok annotations to automatically generate getters, setters, constructors, and toString method
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutStatus {

    // Annotation to specify the ID field
    @Id
    private String statusId;
    private String userId;
    private int distance;
    private int pushUps;
    private int weight;
    private String description;
    private String date;
    private String username;
    private String userProfile;
}
