package com.web.service;


import org.springframework.http.ResponseEntity;

import com.web.repo.LoginRequest;
import com.web.repo.UserMember;



public interface LoginService {
	
    ResponseEntity<UserMember> login(LoginRequest loginRequest);
    
//    UserMember loginResult(String id, String password);
        
    
}
