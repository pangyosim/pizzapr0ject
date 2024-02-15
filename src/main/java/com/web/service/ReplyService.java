package com.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import org.springframework.transaction.annotation.Transactional;

import com.web.persistence.ReplyRepository;
import com.web.repo.Reply;

@Service 
public class ReplyService { 
 
	@Autowired 
	private ReplyRepository replyRepository; 
	 
	// Reply 글쓰기(저장하기) 
	@Transactional // 서비스 함수가 종료될 때까지 commit할지 rollback할지 트랜젝션 관리하겠다는 의미 
	public Reply replyWrite(Reply reply) { 
		return replyRepository.save(reply);
	} 
	
	// Reply 전체 리스트 출력  
	@Transactional
	public List<Reply> replyList(int qaSeq) { 
		return replyRepository.findByQaSeqOrderByReplySeqDesc(qaSeq);
	} 
	
	// Reply 수정하기  
	@Transactional 
	public Reply replyModify(int replySeq, Reply reply) { 
		// 더티채팅 update 치기 
		Reply replyUpdate = replyRepository.findById(replySeq)
				.orElseThrow(()->new IllegalArgumentException("리뷰번호를 확인해주세요~"));
		replyUpdate.setReplyUserId(reply.getReplyUserId());
		replyUpdate.setReplyContents(reply.getReplyContents());
		return replyUpdate;
	} // 함수 종료 -> 트랜젝션 종료 -> 영속화되어있는 데이터를 DB로 갱신(flush) ->  commit ----> 더티채팅
	
	// Reply 삭제하기 
	@Transactional 
	public String replyDelete(int replySeq) { 
		replyRepository.deleteById(replySeq); //일단 오류발생하면 exception 생기니깐 신경x
		return "delete";
	} 
	
	
	
	
	
}
