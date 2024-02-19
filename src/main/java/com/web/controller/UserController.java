//LoginController
package com.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
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
//=================================================================
//    @Autowired
//    private UserRepository userRepository;
//    
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @PostMapping("/register/join")
//    public ResponseEntity<String> join(@RequestBody UserMember userMember) {
//        // 비밀번호 암호화
//        String encodedPassword = bCryptPasswordEncoder.encode(userMember.getPassword());
//        userMember.setPassword(encodedPassword);
//        
//        // 사용자 저장
//        userRepository.save(userMember);
//        System.out.println(userMember);
//
//        return ResponseEntity.ok("");
//    }
    
//    @GetMapping("/register/checkId")
//    public ResponseEntity<String> checkId(@RequestParam String id) {
//    	UserMember user = userRepository.findBycheckId(id);
//        if (user != null) {
//            return ResponseEntity.badRequest().body("아이디가 이미 사용 중입니다.");
//        } else {
//            return ResponseEntity.ok().body("사용 가능한 아이디입니다.");
//        }
//    }
}












