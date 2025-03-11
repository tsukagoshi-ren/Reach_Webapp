package com.reach.main;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import com.reach.shared.models.Post;
import com.reach.shared.models.User;

@Service
public class MainService {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public User getUserProfile(String userId) {
        String sql = "SELECT user_id, password, profile_picture FROM public.\"USER_INFO\" WHERE user_id = :userId";
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

    public List<Post> getAllPosts() {
<<<<<<< HEAD
        String sql = "SELECT post_id, post_user, post_picture, post_text, good_count, post_time FROM public.\"post_info\"";
=======
        String sql = "SELECT post_id, post_user, post_picture, post_text, good_count, post_time FROM public.POST_INFO";
>>>>>>> 2eb9e5ed92e6622cb0b8b18ed1b91d05598c6bdc
        return namedParameterJdbcTemplate.query(sql, new RowMapper<Post>() {
            @Override
            public Post mapRow(ResultSet rs, int rowNum) throws SQLException {
                Post post = new Post();
                post.setPostId(rs.getLong("post_id"));
                post.setPostUser(rs.getString("post_user"));
                post.setPostPicture(rs.getString("post_picture"));
                post.setPostText(rs.getString("post_text"));
                post.setGoodCount(rs.getInt("good_count"));
                post.setPostTime(rs.getTimestamp("post_time").toLocalDateTime());
                return post;
            }
        });
    }
}
