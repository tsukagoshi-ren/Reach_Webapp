package com.reach.shared.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reach.shared.models.User;

public interface UserRepository extends JpaRepository<User, String> {
}
