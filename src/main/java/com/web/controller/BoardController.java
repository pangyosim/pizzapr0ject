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

import com.web.persistence.UserRepository;
import com.web.repo.Board;
import com.web.repo.UserMember;
import com.web.service.BoardService;
import com.web.service.UserService;

@RestController 
public class BoardController { 
 
	@Autowired 
	private BoardService boardService; 

	// Board(공지사항) 글쓰기 
	@CrossOrigin 
	@PostMapping("/board") 
	public ResponseEntity<?> save(@RequestBody Board board) { 
		return new ResponseEntity<>(boardService.save(board), HttpStatus.CREATED); 
	}
	
	// Board(공지사항) 전체 리스트 출력  
	@CrossOrigin 
	@GetMapping("/board") 
	public ResponseEntity<?> findAll() { 
		return new ResponseEntity<>(boardService.findAll(), HttpStatus.OK); 
	} 

	// Board(공지사항) 상세보기
	@CrossOrigin 
	@GetMapping("/board/{boardSeq}") 
	public ResponseEntity<?> deTail(@PathVariable int boardSeq) { 
		return new ResponseEntity<>(boardService.deTail(boardSeq), HttpStatus.OK); 
	} 
	
	// Board(공지사항) 수정하기
	@CrossOrigin 
	@PutMapping("/board/{boardSeq}") 
	public ResponseEntity<?> update(@PathVariable int boardSeq,@RequestBody Board board) { 
		return new ResponseEntity<>(boardService.update(boardSeq,board), HttpStatus.OK); 
	} 
	
	// Board(공지사항) 삭제하기
	@CrossOrigin 
	@DeleteMapping("/board/{boardSeq}") 
	public ResponseEntity<?> delete(@PathVariable int boardSeq) { 
		return new ResponseEntity<>(boardService.delete(boardSeq), HttpStatus.OK); 
	} 
	
	
	
}