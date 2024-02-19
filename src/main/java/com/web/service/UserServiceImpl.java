package com.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.persistence.UserRepository;
import com.web.repo.UserMember;



@Service
public class UserServiceImpl implements UserService {
    
	@Autowired
	private final UserRepository userRepository;


    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserMember createUser(String id, String name, String password, String socialnum1, String socialnum2,
			String phoneNumber1, String phoneNumber2, String email, String addr1,
			String addr2, String addr3, String addr4, String provider) {
        UserMember newUser = new UserMember();
        newUser.setId(id);
        newUser.setUsername(name);
        newUser.setPassword(password);
        newUser.setSocialnum(socialnum1+"-"+socialnum2); 
        newUser.setPhoneNumber(phoneNumber1+"-"+phoneNumber2); 
        newUser.setEmail(email);
        newUser.setAddress(addr1+"/"+addr2+"/"+addr3+"/"+addr4);
        
       
        newUser.setProvider(provider);
        
        return userRepository.save(newUser);
    }


    
    
    
}
