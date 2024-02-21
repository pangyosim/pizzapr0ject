package com.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import org.springframework.transaction.annotation.Transactional;

import com.web.persistence.BoardRepository;
import com.web.persistence.QnARepository;
import com.web.repo.Board;
import com.web.repo.QnA;


@Service
public class BoardService { 
 
	@Autowired 
	private BoardRepository boardRepository; 
	 
	// Board(공지사항) 글쓰기(저장하기) 
	@Transactional // 서비스 함수가 종료될 때까지 commit할지 rollback할지 트랜젝션 관리하겠다는 의미 
	public Board save(Board board) { 
		return boardRepository.save(board); 
	} 
	
	// Board(공지사항) 전체 리스트 출력  
	@Transactional(readOnly = true) // JPA 변경감지라는 내부 기능 활성화x, update시의 정합성을 유지해줌. insert의 유령데이터현상(팬텀현상) 못막음 
	public List<Board> findAll() { 
		return boardRepository.findAll(); 
	} 
	
	// Board(공지사항) 상세보기 
	@Transactional 
	public Board deTail(int boardSeq) { 
		Optional<Board> optional = boardRepository.findById(boardSeq);
		Board board = optional.get();
		board.setBoardViews(board.getBoardViews()+1);
		boardRepository.save(board);
		
		return boardRepository.findById(boardSeq)
				.orElseThrow(()->new IllegalArgumentException("QnA번호를 확인해주세요~")); 
	} 
	
	// Board(공지사항) 수정하기  
	@Transactional 
	public Board update(int boardSeq, Board board) { 
		// 더티채팅 update 치기 
		Board boardUpdate = boardRepository.findById(boardSeq)
				.orElseThrow(()->new IllegalArgumentException("QnA번호를 확인해주세요~"));
		boardUpdate.setBoardTitle(board.getBoardTitle());
		boardUpdate.setBoardContents(board.getBoardContents());
		boardUpdate.setBoardFile(board.getBoardFile());
		return boardUpdate;
	} // 함수 종료 -> 트랜젝션 종료 -> 영속화되어있는 데이터를 DB로 갱신(flush) ->  commit ----> 더티채팅
	
	// Board(공지사항) 삭제하기 
	@Transactional 
	public String delete(int boardSeq) { 
		boardRepository.deleteById(boardSeq); //일단 오류발생하면 exception 생기니깐 신경x
		return "delete";
	} 
	
	
	
	
	
}
