package com.web.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.repo.Reply;


public interface ReplyRepository  extends JpaRepository<Reply,Integer>{
	 
	List<Reply> findByQaSeqOrderByReplySeqDesc(int qaSeq);
	
    // 특정 QnA 글에 대한 댓글 개수를 가져오는 메서드
    int countByQaSeq(int qaSeq);
}
