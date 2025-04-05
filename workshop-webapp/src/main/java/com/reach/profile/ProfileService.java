package com.reach.profile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProfileService {
    // プロフィール画像の保存ディレクトリ
    private static final String IMAGE_BASE_DIR = System.getProperty("user.dir") + "/src/main/resources/static/images/profileimages";

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    // ユーザー情報取得メソッド
    public String getProfilePictureByUserId(String userId) {
        String sql = "SELECT profile_picture FROM user_info WHERE user_id = :userId";
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("userId", userId);

        return namedParameterJdbcTemplate.queryForObject(sql, params, (rs, rowNum) -> rs.getString("profile_picture"));
    }

    // プロフィール画像情報更新メソッド
    public String saveProfileImage(String userId, MultipartFile imageFile) {
        if (imageFile == null || imageFile.isEmpty() || userId == null || userId.isEmpty()) {
            return null;
        }

        try {
            // データベースから既存のプロフィール画像を取得
            String existingProfilePicture = getProfilePictureByUserId(userId);

            // 既存の画像を削除
            if (existingProfilePicture != null && !existingProfilePicture.isEmpty()) {
                Path existingFilePath = Paths.get(IMAGE_BASE_DIR, userId, existingProfilePicture);
                if (Files.exists(existingFilePath)) {
                    Files.delete(existingFilePath); // ファイルを削除
                }
            }

            // 新しい画像を保存
            Path userDir = Paths.get(IMAGE_BASE_DIR, userId);
            if (!Files.exists(userDir)) {
                Files.createDirectories(userDir); // ディレクトリ作成
            }

            String originalFileName = imageFile.getOriginalFilename();
            if (originalFileName == null || originalFileName.isEmpty()) {
                return null;
            }

            // 画像名をユニークにする
            String fileName = UUID.randomUUID() + "_" + originalFileName;
            Path filePath = userDir.resolve(fileName);

            // ファイルを保存
            imageFile.transferTo(filePath.toFile());

            // データベースを更新
            updateProfilePictureInDatabase(userId, fileName);

            // 保存された画像名をフロントエンドに返す
            return fileName;

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // データベースの更新
    private void updateProfilePictureInDatabase(String userId, String fileName) {
        String sql = "UPDATE user_info SET profile_picture = :profilePicture WHERE user_id = :userId";
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("profilePicture", fileName);
        params.addValue("userId", userId);

        namedParameterJdbcTemplate.update(sql, params);
    }
}
