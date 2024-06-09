package com.PAF_DS_15_Team.paf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.PAF_DS_15_Team.paf.DTO.CommentDTO;
import com.PAF_DS_15_Team.paf.model.Comment;
import com.PAF_DS_15_Team.paf.service.CommentService;

import java.util.List;

// This controller handles HTTP requests related to comments
@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Endpoint to get comments for a post
    @GetMapping
    public ResponseEntity<List<Comment>> getCommentsForPost(@PathVariable String postId) {
        List<Comment> comments = commentService.getCommentsForPost(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // Endpoint to add a comment to a post
    @PostMapping
    public ResponseEntity<Comment> addCommentToPost(@PathVariable String postId, @RequestBody CommentDTO request) {
        // Add the comment to the post
        Comment comment = commentService.addCommentToPost(postId, request.getContent(), request.getCommentBy(), request.getCommentById() ,request.getCommentByProfile());
        // Return the added comment with status code 201
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    // Endpoint to delete a comment
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String postId, @PathVariable String commentId) {
        // Delete the comment
        commentService.deleteComment(postId, commentId);
        // Return status code 204 (No Content)
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Endpoint to edit a comment
    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> editComment(@PathVariable String commentId, @RequestBody CommentDTO request) {
        // Edit the comment
        Comment editedComment = commentService.editComment(commentId, request.getContent());
        // If the comment was edited successfully, return it with status code 200
        if (editedComment != null) {
            return new ResponseEntity<>(editedComment, HttpStatus.OK);
        } else {
            // If the comment was not found, return status code 404 (Not Found)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
