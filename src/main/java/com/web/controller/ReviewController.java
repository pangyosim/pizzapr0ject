package com.web.controller;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RestController;

import com.web.repo.Review;
import com.web.service.ReviewService; 
 
@RestController 
public class ReviewController { 
 
	@Autowired
	private ReviewService reviewService; 
	
	// 리뷰 글쓰기 
	@CrossOrigin 
	@PostMapping("/review") 
	public ResponseEntity<?> save(@RequestBody Review review) { 
		return new ResponseEntity<>(reviewService.save(review), HttpStatus.CREATED); 
	} 
	
	// 리뷰 전체 리스트 출력  
	@CrossOrigin 
	@GetMapping("/review") 
	public ResponseEntity<?> findAll() { 
		return new ResponseEntity<>(reviewService.findAll(), HttpStatus.OK); 
	} 
	
	// 리뷰 상세보기
	@CrossOrigin 
	@GetMapping("/review/{reviewSeq}") 
	public ResponseEntity<?> deTail(@PathVariable int reviewSeq) { 
		return new ResponseEntity<>(reviewService.deTail(reviewSeq), HttpStatus.OK); 
	} 
	
	// 리뷰 수정하기
	@CrossOrigin 
	@PutMapping("/review/{reviewSeq}") 
	public ResponseEntity<?> update(@PathVariable int reviewSeq,@RequestBody Review review) { 
		return new ResponseEntity<>(reviewService.update(reviewSeq,review), HttpStatus.OK); 
	} 
	
	// 리뷰 삭제하기
	@CrossOrigin 
	@DeleteMapping("/review/{reviewSeq}") 
	public ResponseEntity<?> delete(@PathVariable int reviewSeq) { 
		return new ResponseEntity<>(reviewService.delete(reviewSeq), HttpStatus.OK); 
	} 
	
	
	
	
}