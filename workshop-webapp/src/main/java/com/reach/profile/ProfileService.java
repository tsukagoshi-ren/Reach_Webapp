package com.reach.profile;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.reach.shared.models.User;
import com.reach.shared.repositories.UserRepository;

@Service
public class ProfileService {
    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // プロフィール画像URL取得
    public String getProfilePicture(String userId) {
        return userRepository.findById(userId)
                .map(User::getProfilePicture)
                .orElse(null);
    }

    // プロフィール画像URL更新
    public void updateProfilePicture(String userId, String imageUrl) {
        Optional<User> userInfoOptional = userRepository.findById(userId);
        userInfoOptional.ifPresent(userInfo -> {
            userInfo.setProfilePicture(imageUrl);
            userRepository.save(userInfo);
        });
    }

    // プロフィール画像削除
    public void deleteProfilePicture(String userId) {
        Optional<User> userInfoOptional = userRepository.findById(userId);
        userInfoOptional.ifPresent(userInfo -> {
            userInfo.setProfilePicture(null);
            userRepository.save(userInfo);
        });
    }
}
