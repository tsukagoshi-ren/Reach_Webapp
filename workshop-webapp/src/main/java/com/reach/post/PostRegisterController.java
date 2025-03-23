package com.reach.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.reach.shared.models.Post;

@RestController
@RequestMapping("/api")
public class PostRegisterController {

    @Autowired
    private PostRegisterService postRegisterService;

    @PostMapping("/registerPost")
    public ResponseEntity<Post> registerPost(
            @RequestParam("post_user") String postUser,
            @RequestParam(value = "post_picture", required = false) MultipartFile postPicture,
            @RequestParam("post_text") String postText) {

        Post savedPost = postRegisterService.savePost(postUser, postPicture, postText);
        return ResponseEntity.ok(savedPost);
    }
}