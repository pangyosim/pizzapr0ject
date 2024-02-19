package com.web.persistence;


import org.springframework.data.jpa.repository.JpaRepository;

import com.web.repo.UserMember;



public interface UserRepository extends JpaRepository<UserMember, String>{

	//회원가입
	UserMember findByIdAndPassword(String id, String password);
	
	//로그인
//	UserMember findById(String id,String password);
}
