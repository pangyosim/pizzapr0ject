package com.web.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.repo.Review;


public interface ReviewRepository  extends JpaRepository<Review,Integer>{ 
	 
	}
