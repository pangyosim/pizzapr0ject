package com.web.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.web.repo.QnA;


public interface QnARepository  extends JpaRepository<QnA,Integer>{
	
	Page<QnA> findByQaTitleContaining(String qaTitle, Pageable pageable);
	
	Page<QnA> findByQaUserIdContaining(String keyword, Pageable pageable);
	 
}
