package com.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.repo.LoginRequest;
import com.web.repo.UserMember;
import com.web.service.LoginService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

public class LoginController {

	@Autowired
    private LoginService Ls;

    @PostMapping("/login")
    public ResponseEntity<UserMember> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        ResponseEntity<UserMember> res = Ls.login(loginRequest);
        if (res.getStatusCode() == HttpStatus.OK) {
            // 로그인 성공 시 세션에 사용자 정보 저장
            HttpSession session = request.getSession();
            session.setAttribute("user", res.getBody());
            return ResponseEntity.ok(res.getBody());
        } else {
            return ResponseEntity.status(res.getStatusCode()).body(res.getBody());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            
            session.invalidate();
        }
        // 로그아웃 후에는 메인 페이지로 리디렉션합니다.
        return ResponseEntity.ok().build();
    }
	
	
}
