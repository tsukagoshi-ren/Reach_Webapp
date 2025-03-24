package com.reach.profile;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // 画像URL取得API
    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<String> getUserProfilePicture(@PathVariable String userId) {
        String imageUrl = profileService.getProfilePicture(userId);
        if (imageUrl == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(imageUrl);
    }

    // 画像URL更新API
    @PostMapping("/{userId}/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(
            @PathVariable String userId,
            @RequestParam("imageUrl") String imageUrl) {
    	profileService.updateProfilePicture(userId, imageUrl);
        return ResponseEntity.ok("画像URLが更新されました");
    }

    // 画像削除API
    @DeleteMapping("/{userId}/profile-picture")
    public ResponseEntity<String> deleteProfilePicture(@PathVariable String userId) {
    	profileService.deleteProfilePicture(userId);
        return ResponseEntity.ok("画像が削除されました");
    }
}
