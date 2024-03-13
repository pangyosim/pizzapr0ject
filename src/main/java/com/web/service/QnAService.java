package com.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 
import org.springframework.transaction.annotation.Transactional;

import com.web.persistence.QnARepository;
import com.web.repo.QnA;


@Service
public class QnAService { 
 
	@Autowired 
	private QnARepository qnaRepository; 
	 
	// QnA 글쓰기(저장하기) 
	@Transactional // 서비스 함수가 종료될 때까지 commit할지 rollback할지 트랜젝션 관리하겠다는 의미 
	public QnA save(QnA qna) { 
		return qnaRepository.save(qna); 
	} 
	
	// QnA 전체 리스트 출력  
	@Transactional(readOnly = true) // JPA 변경감지라는 내부 기능 활성화x, update시의 정합성을 유지해줌. insert의 유령데이터현상(팬텀현상) 못막음 
	public List<QnA> findAll() { 
		return qnaRepository.findAll(); 
	}
	
	// QnA 상세보기 
	@Transactional 
	public QnA deTail(int qaSeq) { 
		Optional<QnA> optional = qnaRepository.findById(qaSeq);
		QnA qna = optional.get();
		qna.setQaViews(qna.getQaViews()+1);
		qnaRepository.save(qna);
		
		return qnaRepository.findById(qaSeq)
				.orElseThrow(()->new IllegalArgumentException("QnA번호를 확인해주세요~")); 
	} 
	
	// QnA 수정하기  
	@Transactional 
	public QnA update(int qaSeq, QnA qna) { 
		// 더티채팅 update 치기 
		QnA qaUpdate = qnaRepository.findById(qaSeq)
				.orElseThrow(()->new IllegalArgumentException("QnA번호를 확인해주세요~"));
		qaUpdate.setQaTitle(qna.getQaTitle());
		qaUpdate.setQaContents(qna.getQaContents());
		qaUpdate.setQaFile(qna.getQaFile());
		return qaUpdate;
	} // 함수 종료 -> 트랜젝션 종료 -> 영속화되어있는 데이터를 DB로 갱신(flush) ->  commit ----> 더티채팅
	
	// QnA 삭제하기 
	@Transactional 
	public String delete(int qaSeq) { 
		qnaRepository.deleteById(qaSeq); //일단 오류발생하면 exception 생기니깐 신경x
		return "delete";
	} 
	
	
	
	
	
}
