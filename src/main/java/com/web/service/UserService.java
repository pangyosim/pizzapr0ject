

package com.web.service;

import com.web.repo.UserMember;


public interface UserService {
    

	UserMember createUser(String id, String name, String password, String socialnum1, String socialnum2,
			String phoneNumber1, String phoneNumber2, String email, String addr1,
			String addr2, String addr3, String addr4, String provider);
	

}
