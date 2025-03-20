package com.reach.main;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reach.shared.models.User;

@RestController
public class MainController {
    private static final Logger logger = LoggerFactory.getLogger(MainController.class);

    @Autowired
    private MainService mainService;

    @GetMapping("/main")
    public Map<String, Object> getMainPage(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        logger.info("Loading main page for user_id: {}", userId);
        
        Map<String, Object> response = new HashMap<>();
        
        if (userId != null) {
            // Get user profile for logged-in user (for sidebar)
            User currentUser = mainService.getUserProfile(userId);
            response.put("currentUser", currentUser);
        }
        
        // Get all posts with user information
        List<Map<String, Object>> posts = mainService.getAllPosts();
        response.put("posts", posts);
        
        return response;
    }
    
    @GetMapping("/profile")
    public User getUserProfile(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        logger.info("Fetching profile for user_id: {}", userId);
        return mainService.getUserProfile(userId);
    }

    @GetMapping("/posts")
    public List<Map<String, Object>> getAllPosts() {
        logger.info("Fetching all posts");
        return mainService.getAllPosts();
    }
}