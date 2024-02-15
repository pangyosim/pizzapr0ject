package com.web.repo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "MEMBER")
public class Member {

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private String id; // 회원아이디 
	
	@Column(name = "PASSWORD")
	private String password; // 회원 비밀번호 
	
	@Column(name = "NAME")
	private String name; //회원 이름 

	@Column(name = "MEMBER_SOCIAL_NUM")
	private String socialSecuNum;	// 주민등록번호 전체
	
	@Column(name = "PHONE_NUM")
	private String phoneNumber; // 회원휴대폰번호 

	@Column(name = "EMAIL")
	private String email; // 회원이메일
	
	@Column(name = "DOMAIN")
	private String domain; // 도메인
	
	@Column(name = "ADDR")
	private String addr; // 회원주소 

	@Column(name = "PROVIDER_ID")
	private String providerId; // 해당 OAuth 의 key(id) 로그인토큰
		
}
