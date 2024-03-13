package com.web.repo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

	private String id;			//아이디
	private String name;		//이름
    private String password;	//패스워드
    private String socialnum1;	//주민번호
    private String socialnum2;	//주민번호
    private String phoneNumber1;	//폰넘버
    private String phoneNumber2;	//폰넘버
    private String email;		//이메일
    private String homepage;	//도메인
    private String addr1;		//주소
    private String addr2;		//주소
    private String addr3;		//주소
    private String addr4;		//주소
    private String provider;	//로그인토큰
    
    public UserRequest() {}

	public UserRequest(String id, String name, String password, String socialnum1, String socialnum2,
			String phoneNumber1, String phoneNumber2,  String email, String homepage, String addr1,
			String addr2, String addr3, String addr4, String provider) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.socialnum1 = socialnum1;
		this.socialnum2 = socialnum2;
		this.phoneNumber1 = phoneNumber1;
		this.phoneNumber2 = phoneNumber2;
		this.email = email;
		this.homepage = homepage;
		this.addr1 = addr1;
		this.addr2 = addr2;
		this.addr3 = addr3;
		this.addr4 = addr4;
		this.provider = provider;
	}

    
    

}