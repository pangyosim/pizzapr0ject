//LoginController

package com.web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.web.repo.UserMember;
import com.web.repo.UserRequest;
import com.web.service.UserService;


@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserMember> createUser(@RequestBody UserRequest request){
    	
    	
        UserMember createdUser = userService.createUser(
        		request.getId(), 
        		request.getName(),
        		request.getPassword(),
        		request.getSocialnum1(), 
        		request.getSocialnum2(), 
        		request.getPhoneNumber1(), 
        		request.getPhoneNumber2(), 
        		request.getEmail(), 
		        request.getAddr1(), 
		        request.getAddr2(), 
		        request.getAddr3(), 
		        request.getAddr4(), 
		        request.getProvider() 
		        );
        
        System.out.println(createdUser.toString());
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // 모든 회원 조회
    @CrossOrigin 
    @GetMapping("/members")
    public ResponseEntity<?> findAll() {
        return  new ResponseEntity<>(userService.findAll(), HttpStatus.OK); 
    }
    
}












