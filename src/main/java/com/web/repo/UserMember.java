package com.web.repo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "member")

public class UserMember {
	
	@Id
	@Column(name="ID")
	private String id;
	@Column(name="PASSWORD")
	private String password;
	@Column(name="NAME")
	private String username;
	@Column(name="MEMBER_SOCIAL_NUM")
	private String socialnum;
	@Column(name="PHONE_NUM")
	private String phoneNumber;
	@Column(name="EMAIL")
	private String email;
	@Column(name="ADDR")
	private String address;
	@Column(name="PROVIDER_ID")
	private String provider;
	@Enumerated(EnumType.STRING)
	@Column(name = "ROLE")
	private Role role = Role.ROLE_USER; // 기본값으로 ROLE_USER 설정// 로그인 시 admin 과 user 선택해서 로그인 진행  
	
	 // 생성자
	@Builder
    public UserMember(String id,String password, String username, String socialnum, String phoneNumber, String email, String address, String provider, Role role) {
        this.id=id;
        this.username = username;
    	this.password = password;
        this.socialnum = socialnum;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.provider = provider;
        this.role = role != null ? role : Role.ROLE_USER; // role이 null이면 기본값으로 ROLE_USER 지정
    }
	
	
	
}
