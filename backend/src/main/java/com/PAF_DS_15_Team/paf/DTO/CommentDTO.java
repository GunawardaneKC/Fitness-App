package com.PAF_DS_15_Team.paf.DTO;
//DTO (Data Transfer Object) is a design pattern used to transfer data between software application subsystems or layers
// Importing Lombok annotations for generating boilerplate code
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data

@NoArgsConstructor

@AllArgsConstructor
public class CommentDTO {
  
    private String content;
    
   
    private String commentBy;
    
    // Field to store the unique identifier of the user who made the comment
    private String commentById;
    
    // Field to store additional profile-related information about the user who made the comment,
    // such as their profile picture URL or other details
    private String commentByProfile;
}
