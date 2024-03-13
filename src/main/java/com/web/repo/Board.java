package com.web.repo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "BOARD")
public class Board {

	@Id
	@GeneratedValue
	@Column(name="BOARD_SEQ")
	private int boardSeq; // 게시판글번호
	
	@Column(updatable = false, name = "BOARD_USER_ID")
	private String boardUserId; // 게시판작성자
	
	@Column(name="BOARD_TITLE")
	private String boardTitle; // 게시판제목
	
	@Column(name="BOARD_CONTENTS")
	private String boardContents; // 제시판내용
	
	@Column(name="BOARD_VIEWS", insertable = false, columnDefinition = "number default 0")
	private int boardViews; // 게시판조회수
	
	@Column(name = "BOARD_FILE")
	private String boardFile; // 파일 
	
	@Column(name="BOARD_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date boardDate; // 작성일자
	
}
