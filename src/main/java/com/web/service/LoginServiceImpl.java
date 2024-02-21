package com.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.web.persistence.UserRepository;
import com.web.repo.LoginRequest;
import com.web.repo.UserMember;



@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private UserRepository userRepository;
	

	@Override
	public ResponseEntity<UserMember> login(LoginRequest loginRequest) {
		String id = loginRequest.getId();
		String password = loginRequest.getPassword();

		// 사용자 인증 로직을 수행합니다.
		UserMember userMember = userRepository.findByIdAndPassword(id,password);
		System.out.println(userMember);
		if (userMember != null) {
			// 사용자 인증에 성공하면 해당 사용자 정보를 ResponseEntity에 담아 반환합니다.
			return new ResponseEntity<>(userMember, HttpStatus.OK);
		} else {
			// 사용자 인증에 실패한 경우, 실패 상태 코드와 함께 응답합니다.
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
}
