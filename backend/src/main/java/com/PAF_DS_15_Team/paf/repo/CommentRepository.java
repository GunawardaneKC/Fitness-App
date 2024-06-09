package com.PAF_DS_15_Team.paf.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.PAF_DS_15_Team.paf.model.Comment;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> { // This interface extends MongoRepository, allowing it to interact with the MongoDB database
    List<Comment> findByPostId(String postId);
}
