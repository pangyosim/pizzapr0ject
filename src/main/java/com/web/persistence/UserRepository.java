package com.web.persistence;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.repo.UserMember;


@Repository
public interface UserRepository extends JpaRepository<UserMember, String>{

	//회원가입
	UserMember findByIdAndPassword(String id, String password);

	UserMember findBycheckId(String id);
	
	//로그인
//	UserMember findById(String id,String password);
}
