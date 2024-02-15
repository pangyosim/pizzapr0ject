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

import com.web.repo.QnA;
import com.web.repo.Reply;
import com.web.service.QnAService;
import com.web.service.ReplyService;

@RestController 
public class QnAController { 
 
	@Autowired 
	private QnAService qnaService; 
	
	@Autowired 
	private ReplyService replyService; 
	
	// QnA 글쓰기 
	@CrossOrigin 
	@PostMapping("/qna") 
	public ResponseEntity<?> save(@RequestBody QnA qna) { 
		return new ResponseEntity<>(qnaService.save(qna), HttpStatus.CREATED); 
	}
	
	// QnA 전체 리스트 출력  
	@CrossOrigin 
	@GetMapping("/qna") 
	public ResponseEntity<?> findAll() { 
		return new ResponseEntity<>(qnaService.findAll(), HttpStatus.OK); 
	}
	
	// QnA 상세보기
	@CrossOrigin 
	@GetMapping("/qna/{qaSeq}") 
	public ResponseEntity<?> deTail(@PathVariable int qaSeq) { 
		return new ResponseEntity<>(qnaService.deTail(qaSeq), HttpStatus.OK); 
	} 
	
	// QnA 수정하기
	@CrossOrigin 
	@PutMapping("/qna/{qaSeq}") 
	public ResponseEntity<?> update(@PathVariable int qaSeq,@RequestBody QnA qna) { 
		return new ResponseEntity<>(qnaService.update(qaSeq,qna), HttpStatus.OK); 
	} 
	
	// QnA 삭제하기
	@CrossOrigin 
	@DeleteMapping("/qna/{qaSeq}") 
	public ResponseEntity<?> delete(@PathVariable int qaSeq) { 
		return new ResponseEntity<>(qnaService.delete(qaSeq), HttpStatus.OK); 
	} 

	//================================================
	//	댓글 controller
	//================================================
	
	@CrossOrigin 
	@GetMapping("/reply/{qaSeq}") 
	public ResponseEntity<?> replyList(@PathVariable int qaSeq) { 
		return new ResponseEntity<>(replyService.replyList(qaSeq), HttpStatus.OK); 
	} 
	
	// 댓글 글쓰기 
	@CrossOrigin 
	@PostMapping("/reply") 
	public ResponseEntity<?> replyWrite(@RequestBody Reply reply) { 
		return new ResponseEntity<>(replyService.replyWrite(reply), HttpStatus.CREATED); 
	}
	
	// 댓글 수정하기
	@CrossOrigin 
	@PutMapping("/reply/{replySeq}") 
	public ResponseEntity<?> replyModify(@PathVariable int replySeq,@RequestBody Reply reply) { 
		return new ResponseEntity<>(replyService.replyModify(replySeq,reply), HttpStatus.OK); 
	} 
	
	// QnA 삭제하기
	@CrossOrigin 
	@DeleteMapping("/reply/{replySeq}") 
	public ResponseEntity<?> replyDelete(@PathVariable int replySeq) { 
		return new ResponseEntity<>(replyService.replyDelete(replySeq), HttpStatus.OK); 
	} 
	
	@GetMapping("/reply/count/{qaSeq}") 
	public ResponseEntity<Integer> countRepliesByQaSeq(@PathVariable int qaSeq) { 
	    return new ResponseEntity<>(replyService.countRepliesByQaSeq(qaSeq), HttpStatus.OK); 
	} 
	
	
	
}