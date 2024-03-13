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
@Table(name = "QnA")
public class QnA {
	
	@Id
	@GeneratedValue
	@Column(name="QA_SEQ")
	private int qaSeq; // Q&A글번호
	
	@Column(updatable = false, name = "QA_USER_ID")
	private String qaUserId; // Q&A작성자
	
	@Column(name="QA_TITLE")
	private String qaTitle; //Q&A제목
	
	@Column(name="QA_CONTENTS")
	private String qaContents; // Q&A내용
	
	@Column(name="QA_VIEWS",insertable = false, columnDefinition = "number default 0")
	private int qaViews; // Q&A조회수
	
	@Column(name = "QA_FILE")
	private String qaFile; // 파일
	
	@Column(name="QA_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date qaDate; // Q&A작성일자
}
