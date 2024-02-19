package com.web.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.config.auth.PrincipalDetails;
import com.web.repo.UserMember;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

	 private final AuthenticationManager authenticationManager;
	 
	 @Override
	    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
	        System.out.println("JwtAuthenticationFilter : 로그인 시도중...");

	        // 1 사용자의 userName, password 를 받는다
	        try {
	            // json 데이터를 파싱해줌
	            ObjectMapper objectMapper = new ObjectMapper();
	            UserMember userMember = objectMapper.readValue(request.getInputStream(), UserMember.class);
	            // 유저에 정보가 잘 담겼는지 print 해보기
	            System.out.println(userMember);
	            // 토큰 생성(userName, password 를 담은)
	            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
	                    new UsernamePasswordAuthenticationToken(userMember.getId(),userMember.getPassword());
	            // authenticationManager.authenticate() 인증 수행하기
	            // 그리고 PrincipalDetailsService 의 loadByUsername() 함수가 실행됨
	            Authentication authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
	            System.out.println(request.getInputStream()); // request.getInputStream() 은 HttpServletRequest 객체로부터 입력 스트림을 가져오는 데 사용
	            // 클라이언트 또는 다른 웹브라우저에서 서버로 전송된 데이터를 읽는데 사용할 수 있는 InputStream 객체
	            // authenticate 객체가 session 영역에 저장됨
	            PrincipalDetails principalDetails = (PrincipalDetails)authenticate.getPrincipal();
	            System.out.println("==================로그인 완료=================="); // 구분선
	            System.out.println("principalDetails userName :"+principalDetails.getUsername());
	            System.out.println("==============================================="); // 구분선
	            return authenticate;
	        } catch (Exception ex) {
	            ex.printStackTrace();
	            return null;
	        }
	    }
	    
	    // 순서 ->  attemptAuthentication 에서 인증이 정상적으로 실행되고 successfulAuthentication 메서드 실행
	    // JWT 토큰을 만들어서 request 요청한 사용자에게 토큰을 응답과함께 전달
	    @Override
	    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
	        System.out.println("사용자 인증이 완료되어 successfulAuthentication 메서드가 실행됩니다.");
	        
	        // PrincipalDetails에서 사용자 정보 가져오기
	        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();


//	        // 빌드패턴으로 토큰 생성하기
//	        String jwtToken = Jwts.builder()
//	                .withSubject("JWT-TOKEN")
//	                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 10))) // 토큰의 유효시간을 10분으로 지정
//	                .withClaim("id", principalDetails.getUser().getId())
//	                .withClaim("username", principalDetails.getUser().getUserName())
//	                .sign(Algorithm.HMAC512("server-secret")); // server만 알고있는 secret값 으로 서명
//
//	        response.addHeader("Authentication","Bearer "+jwtToken);  // 사용자에게 응답
//
//	        System.out.println("==================토큰 생성==================");
//	        System.out.println("name : Authentication");
//	        System.out.println("value: Bearer "+ jwtToken);

	        
	     
	    }
	 
}
