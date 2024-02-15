package com.web.service;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import org.springframework.transaction.annotation.Transactional;

import com.web.persistence.ReviewRepository;
import com.web.repo.Review;

 

@Service 
public class ReviewService { 
 
	@Autowired 
	private ReviewRepository reviewRepository; 
	 
	// 리뷰 글쓰기(저장하기) 
	@Transactional // 서비스 함수가 종료될 때까지 commit할지 rollback할지 트랜젝션 관리하겠다는 의미 
	public Review save(Review review) { 
		return reviewRepository.save(review); 
	} 
	
	// 리뷰 전체 리스트 출력  
	@Transactional(readOnly = true) // JPA 변경감지라는 내부 기능 활성화x, update시의 정합성을 유지해줌. insert의 유령데이터현상(팬텀현상) 못막음 
	public List<Review> findAll() { 
		return reviewRepository.findAll(); 
	} 
	
	// 리뷰 상세보기 
	@Transactional 
	public Review deTail(int reviewSeq) { 
		return reviewRepository.findById(reviewSeq)
				.orElseThrow(()->new IllegalArgumentException("리뷰번호를 확인해주세요~")); 
	} 
	
	// 리뷰 수정하기  
	@Transactional 
	public Review update(int reviewSeq, Review review) { 
		// 더티채팅 update 치기 
		Review reviewUpdate = reviewRepository.findById(reviewSeq)
				.orElseThrow(()->new IllegalArgumentException("리뷰번호를 확인해주세요~"));
		reviewUpdate.setReviewContents(review.getReviewContents());
		return reviewUpdate;
	} // 함수 종료 -> 트랜젝션 종료 -> 영속화되어있는 데이터를 DB로 갱신(flush) ->  commit ----> 더티채팅
	
	// 리뷰 삭제하기 
	@Transactional 
	public String delete(int reviewSeq) { 
		reviewRepository.deleteById(reviewSeq); //일단 오류발생하면 exception 생기니깐 신경x
		return "delete";
	} 
	
	
	
	
	
}
