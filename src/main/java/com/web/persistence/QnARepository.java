package com.web.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.repo.QnA;


public interface QnARepository  extends JpaRepository<QnA,Integer>{
}
