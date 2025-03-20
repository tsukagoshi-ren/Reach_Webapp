package com.reach.userRegister;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import com.reach.shared.models.User;

@Service
public class UserRegisterService {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public boolean registerUser(User user) {
        String sql = "INSERT INTO public.USER_INFO (user_id, password) VALUES (:userId, :password)";
        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("userId", user.getUserId());
        params.addValue("password", user.getPassword());

        try {
            namedParameterJdbcTemplate.update(sql, params);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
