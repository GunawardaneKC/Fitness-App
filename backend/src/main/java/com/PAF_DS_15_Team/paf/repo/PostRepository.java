package com.PAF_DS_15_Team.paf.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.PAF_DS_15_Team.paf.model.Post;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    Post findPostById(String id);

    List<Post> findByUserId(String userId);
}