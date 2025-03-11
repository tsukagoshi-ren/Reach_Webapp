package com.reach.login;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import com.reach.shared.models.User;

@Service
public class LoginService {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public User findUserByIdAndPassword(String userId, String password) {
        String sql = "SELECT user_id, password, profile_picture FROM public.\"USER_INFO\" WHERE user_id = :userId AND password = :password";
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("userId", userId);
        params.addValue("password", password);

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
}
