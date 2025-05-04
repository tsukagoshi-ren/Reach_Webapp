package com.reach.userRegister;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reach.shared.models.User;

@RestController
@RequestMapping("/register")
public class UserRegisterController {
    private static final Logger logger = LoggerFactory.getLogger(UserRegisterController.class);

    @Autowired
    private UserRegisterService userRegisterService;

    @PostMapping
    public ResponseEntity<String> register(@RequestParam("user_id") String userId,
            @RequestParam("password") String password, HttpSession session) {
        logger.info("Register request received for user_id: {}", userId);

        if (userId == null || userId.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            logger.warn("Registration failed: user_id or password is blank");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID and password must not be blank");
        }

        User user = new User();
        user.setUserId(userId);
        user.setPassword(password);

        if (userRegisterService.registerUser(user)) {
            session.setAttribute("userId", userId); // ユーザーIDをセッションに保存
            logger.info("User registration successful for user_id: {}", userId);
            return ResponseEntity.ok("/main");
        } else {
            logger.warn("User registration failed for user_id: {}", userId);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed");
        }
    }
}
