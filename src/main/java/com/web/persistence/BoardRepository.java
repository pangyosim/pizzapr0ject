package com.web.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.repo.Board;


public interface BoardRepository  extends JpaRepository<Board,Integer>{
	 
}
