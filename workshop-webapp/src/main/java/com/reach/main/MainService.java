package com.reach.main;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import com.reach.shared.models.User;

@Service
public class MainService {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public User getUserProfile(String userId) {
        String sql = "SELECT user_id, password, profile_picture FROM public.USER_INFO WHERE user_id = :userId";
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("userId", userId);

        try {
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
        } catch (Exception e) {
            // エラーログを出力
            System.err.println("SQL Execution Failed: " + e.getMessage());
            e.printStackTrace();
            return null; // 必要に応じて適切なエラー処理を追加
        }
    }


    public List<Map<String, Object>> getAllPosts() {
        // Join POST_INFO and USER_INFO tables to get posts with user information
        String sql = "SELECT p.post_id, p.post_user, p.post_picture, p.post_text, p.good_count, p.post_time, " +
                     "u.profile_picture as user_profile_picture " +
                     "FROM public.POST_INFO p " +
                     "JOIN public.USER_INFO u ON TRIM(p.post_user) = TRIM(u.user_id) " +
                     "ORDER BY p.post_time DESC";
                     
        return namedParameterJdbcTemplate.query(sql, new RowMapper<Map<String, Object>>() {
            @Override
            public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
                Map<String, Object> postWithUserInfo = new HashMap<>();
                
                // Post information
                postWithUserInfo.put("postId", rs.getLong("post_id"));
                
                // User ID (trimmed to remove CHAR padding)
                String userId = rs.getString("post_user").trim();
                postWithUserInfo.put("postUser", userId);
                
                postWithUserInfo.put("postPicture", rs.getString("post_picture"));
                postWithUserInfo.put("postText", rs.getString("post_text"));
                postWithUserInfo.put("goodCount", rs.getInt("good_count"));
                
                // Post time and elapsed time
                LocalDateTime postTime = rs.getTimestamp("post_time").toLocalDateTime();
                postWithUserInfo.put("postTime", postTime);
                
                // Calculate time elapsed since posting
                String timeElapsed = calculateTimeElapsed(postTime);
                postWithUserInfo.put("timeElapsed", timeElapsed);
                
                // User information
                postWithUserInfo.put("userProfilePicture", rs.getString("user_profile_picture"));
                
                return postWithUserInfo;
            }
        });
    }
    
    /**
     * Calculate time elapsed since posting in a human-readable format
     * @param postTime The time when the post was created
     * @return A string like "5分前", "3時間前", "2日前", etc.
     */
    private String calculateTimeElapsed(LocalDateTime postTime) {
        LocalDateTime now = LocalDateTime.now();
        
        long minutesElapsed = ChronoUnit.MINUTES.between(postTime, now);
        if (minutesElapsed < 60) {
            return minutesElapsed + "分前";
        }
        
        long hoursElapsed = ChronoUnit.HOURS.between(postTime, now);
        if (hoursElapsed < 24) {
            return hoursElapsed + "時間前";
        }
        
        long daysElapsed = ChronoUnit.DAYS.between(postTime, now);
        if (daysElapsed < 30) {
            return daysElapsed + "日前";
        }
        
        long monthsElapsed = ChronoUnit.MONTHS.between(postTime, now);
        if (monthsElapsed < 12) {
            return monthsElapsed + "ヶ月前";
        }
        
        long yearsElapsed = ChronoUnit.YEARS.between(postTime, now);
        return yearsElapsed + "年前";
    }
}