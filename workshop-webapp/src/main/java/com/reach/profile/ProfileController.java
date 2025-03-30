package com.reach.profile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
public class ProfileController {
	 private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
    @Autowired
    private ProfileService profileService;

    @PostMapping("/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") String userId) {
    	
        // ProfileServiceを呼び出す
        String savedProfileImage = profileService.saveProfileImage(userId, file);
        
        logger.info("Fetching profile for savedProfileImage: {}", savedProfileImage);
        // 画像の保存先を返す
        return ResponseEntity.ok(savedProfileImage);
    }

//    // ファイルのバリデーション
//    private void validateImageFile(MultipartFile file) {
//        // ファイルが空でないことを確認
//        if (file.isEmpty()) {
//            throw new IllegalArgumentException("ファイルが選択されていません");
//        }
//
//        // ファイルサイズの制限（例：10MB）
//        long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
//        if (file.getSize() > MAX_FILE_SIZE) {
//            throw new IllegalArgumentException("ファイルサイズが大きすぎます。10MB以下のファイルを選択してください");
//        }
//
//        // 許可される画像の種類
//        String[] ALLOWED_CONTENT_TYPES = {
//            "image/jpeg", "image/png", "image/gif", "image/webp"
//        };
//        boolean isAllowedType = false;
//        for (String allowedType : ALLOWED_CONTENT_TYPES) {
//            if (allowedType.equals(file.getContentType())) {
//                isAllowedType = true;
//                break;
//            }
//        }
//        if (!isAllowedType) {
//            throw new IllegalArgumentException("サポートされていない画像形式です");
//        }
//    }
}