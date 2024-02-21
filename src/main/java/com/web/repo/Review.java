package com.web.repo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


/*
CREATE TABLE `Review` (
	`REVIEW_SEQ`	NUMBER(10)	NOT NULL	COMMENT 'PRIMARY KEY',
	`REVIEW_USER_ID`	VARCHAR2(20)	NOT NULL	COMMENT 'FOREIGN KEY',
	`REVIEW_CONTENTS`	VARCHAR2(1000)	NOT NULL,
	`REVIEW_DATE`	Date	NOT NULL	COMMENT 'SYSDATE'
);

 */


@Getter
@Setter
@ToString
@Entity
@Table(name = "REVIEW")
public class Review {
		
	@Id
	@GeneratedValue
	@Column(name="REVIEW_SEQ")
	private int reviewSeq; // 리뷰글번호
	
	@JoinColumn(name = "KRNBRM")
	private String krnbrm; // 은행이름 
	
	@Column(updatable = false, name = "REVIEW_USER_ID")
	private String reviewUserId; // 리뷰작성자
	
	@Column(name="REVIEW_CONTENTS")
	private String reviewContents; //리뷰내용
	
	@Column(name="REVIEW_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	private Date reviewDate; //리뷰작성일 

	@Column(name = "STARRATING")
	private float starRating; // 별점 점수
	
}

