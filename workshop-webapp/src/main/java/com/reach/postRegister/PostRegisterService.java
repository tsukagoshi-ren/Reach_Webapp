package com.reach.postRegister;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.reach.shared.models.Post;
import com.reach.shared.models.User;

@Service
public class PostRegisterService {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public User getUserProfile(String userId) {
        String sql = "SELECT user_id, password, profile_picture FROM public.USER_INFO WHERE user_id = :userId";
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("userId", userId);

        return namedParameterJdbcTemplate.queryForObject(sql, params, new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                User user = new User();
                user.setUserId(rs.getString("user_id"));
                user.setPassword(rs.getString("password"));
                user.setProfilePicture(rs.getString("profile_picture"));
                return user;
            }
        });
    }

    
    // アプリのルートディレクトリに保存するように変更
    private static final String IMAGE_BASE_DIR = System.getProperty("user.dir") + "/src/main/resources/static/images/postimages";

    // 画像の保存
    public String saveImage(MultipartFile file, String postUser) {
        if (file == null || file.isEmpty() || postUser == null || postUser.isEmpty()) {
            return null;
        }

        try {
            // ユーザー専用フォルダを構築
            Path userDir = Paths.get(IMAGE_BASE_DIR, postUser);
            if (!Files.exists(userDir)) {
                Files.createDirectories(userDir);
            }

            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null || originalFileName.isEmpty()) {
                return null;
            }

            String fileName = UUID.randomUUID() + "_" + originalFileName;
            Path filePath = userDir.resolve(fileName);

            // ファイル保存
            file.transferTo(filePath.toFile());

            // アクセス用パスを返却
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 投稿データ保存
    public Post savePost(String postUser, MultipartFile postPicture, String postText) {
        String imageUrl = saveImage(postPicture, postUser);
        
        String sql = "INSERT INTO post_info (post_user, post_picture, post_text, post_time, good_count) " +
                     "VALUES (:postUser, :postPicture, :postText, CURRENT_TIMESTAMP, 0) RETURNING post_id, post_time";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("postUser", postUser);
        params.addValue("postPicture", imageUrl != null ? imageUrl : "");
        params.addValue("postText", postText);

        return namedParameterJdbcTemplate.queryForObject(sql, params, (rs, rowNum) -> {
            Post post = new Post();
            post.setPostId(rs.getLong("post_id"));
            post.setPostUser(postUser);
            post.setPostPicture(imageUrl);
            post.setPostText(postText);
            post.setGoodCount(0);
            post.setPostTime(rs.getTimestamp("post_time").toLocalDateTime());
            return post;
        });
    }
}

