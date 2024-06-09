package com.PAF_DS_15_Team.paf.service;

import java.util.List;

import com.PAF_DS_15_Team.paf.model.Comment;

public interface CommentService {
    List<Comment> getCommentsForPost(String postId);
    Comment addCommentToPost(String postId, String content, String commentBy, String commentById ,String commentByProfile);
    void deleteComment(String postId, String commentId);

    Comment editComment(String commentId, String content);
}
// This interface defines the contract for the Comment service
