package com.web.config.auth;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.io.Serializable;
import java.util.ArrayList;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.web.repo.UserMember;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class PrincipalDetails implements UserDetails, Serializable{
	
	private static final long serialVersionUID = 1L;//이거랑 Serializable..!!

	private UserMember user;
	
	public PrincipalDetails (UserMember user) {
		this.user = user;
	}
	
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString()));
    }

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
    
    
}
