package com.web.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.repo.Reply;


public interface ReplyRepository  extends JpaRepository<Reply,Integer>{
	 
	List<Reply> findByQaSeqOrderByReplySeqDesc(int qaSeq);
//	void deleteAllByQaSeq(int qaSeq);	
}
