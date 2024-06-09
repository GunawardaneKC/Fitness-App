package com.PAF_DS_15_Team.paf.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;


@Document(collection = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    private String id; 
    private String postId; // Stores the ID of the post to which this comment belongs
    private String content;
    private String commentBy;
    private String commentByProfile;
    private String commentById;
    @DateTimeFormat
    private String createdAt;


}
