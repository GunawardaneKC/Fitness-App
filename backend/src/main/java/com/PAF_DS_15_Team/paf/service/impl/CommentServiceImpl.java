package com.PAF_DS_15_Team.paf.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF_DS_15_Team.paf.model.Comment;
import com.PAF_DS_15_Team.paf.model.Post;
import com.PAF_DS_15_Team.paf.repo.CommentRepository;
import com.PAF_DS_15_Team.paf.repo.PostRepository;
import com.PAF_DS_15_Team.paf.service.CommentService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

// Indicates that this class provides a service
@Service
public class CommentServiceImpl implements CommentService {

    // Autowired annotation injects an instance of CommentRepository
    @Autowired
    private CommentRepository commentRepository;

    // Autowired annotation injects an instance of PostRepository
    @Autowired
    private PostRepository postRepository;

    // Retrieves all comments associated with a post
    @Override
    public List<Comment> getCommentsForPost(String postId) {
        return commentRepository.findByPostId(postId);
    }

    // Adds a new comment to a post
    @Override
    public Comment addCommentToPost(String postId, String content, String commentBy, String commentById ,String commentByProfile) {
        // Create a new comment object
        Comment comment = new Comment();
        // Set content, commentBy, commentById, commentByProfile, and createdAt fields
        comment.setContent(content);
        comment.setCommentBy(commentBy);
        comment.setCommentById(commentById);
        comment.setCommentByProfile(commentByProfile);
        comment.setCreatedAt(String.valueOf(new Date()));

        // Find the post by its postId
        Post post = postRepository.findById(postId).orElse(null);
        // If the post exists
        if (post != null) {
            // Set the postId of the comment to the postId of the post
            comment.setPostId(post.getId());
            // Save the comment to the database using the commentRepository
            return commentRepository.save(comment);
        } else {
            // If the post doesn't exist, return null
            return null;
        }
    }

    // Deletes a comment
    @Override
    public void deleteComment(String postId, String commentId) {
        // Delete the comment by its commentId
        commentRepository.deleteById(commentId);
    }

    // Edits the content of a comment
    @Override
    public Comment editComment(String commentId, String content) {
        // Find the comment by its commentId
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        // If the comment exists
        if (optionalComment.isPresent()) {
            // Get the comment from the optional
            Comment comment = optionalComment.get();
            // Update the content of the comment
            comment.setContent(content);
            // Save the updated comment to the database
            return commentRepository.save(comment);
        } else {
            // If the comment doesn't exist, return null
            return null;
        }
    }
}
