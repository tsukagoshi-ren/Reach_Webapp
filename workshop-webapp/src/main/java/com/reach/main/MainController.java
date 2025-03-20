package com.reach.main;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reach.shared.models.Post;
import com.reach.shared.models.User;

@RestController
public class MainController {
    private static final Logger logger = LoggerFactory.getLogger(MainController.class);

    @Autowired
    private MainService mainService;

    @GetMapping("/profile")
    public User getUserProfile(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        logger.info("Fetching profile for user_id: {}", userId);
        return mainService.getUserProfile(userId);
    }

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        logger.info("Fetching all posts");
        return mainService.getAllPosts();
    }
}
