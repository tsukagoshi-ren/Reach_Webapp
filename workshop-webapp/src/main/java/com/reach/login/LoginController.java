package com.reach.login;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.reach.shared.models.User;

@RestController
@RequestMapping("/login")
public class LoginController {
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<String> login(@RequestParam("user_id") String userId,
            @RequestParam("password") String password, HttpSession session) {
        logger.info("Login request received for user_id: {}", userId);

        User user = null;
        try {
            user = loginService.findUserByIdAndPassword(userId, password);
        } catch (EmptyResultDataAccessException e) {
            logger.warn("User not found for user_id: {}", userId);
        }

        if (user != null) {
            session.setAttribute("userId", userId); // ユーザーIDをセッションに保存
            logger.info("Login successful for user_id: {}", userId);
            return ResponseEntity.ok("/main");
        } else {
            logger.warn("Login failed for user_id: {}", userId);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
