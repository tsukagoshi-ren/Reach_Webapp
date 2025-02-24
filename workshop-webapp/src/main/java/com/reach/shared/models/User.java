package com.reach.shared.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_info") // 既存のテーブル名を指定
public class User {
    @Id
    @Column(name = "user_id") // 既存のカラム名を指定
    private String userId;

    @Column(name = "password") // 既存のカラム名を指定
    private String password;

    @Column(name = "profile_picture") // 既存のカラム名を指定
    private String profilePicture;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
