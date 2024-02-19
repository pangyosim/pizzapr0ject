package com.web.repo;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "REPLY")
public class Reply {
	
	@Id
	@GeneratedValue
	@Column(name = "REPLY_SEQ")
	private int replySeq; // 댓글번호
	
	@JoinColumn(name = "QA_SEQ")
	private int qaSeq; // Q&A글번호
	
	@Column(name = "REPLY_CONTENTS",nullable = false)
	private String replyContents; // 댓글내용 
	
	@Column(name = "REPLY_USER_ID") 
	private String replyUserId; // 댓글작성자 
	
	@Column(name = "REPLY_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	private Date replyDate; // 작성날짜(SYSDATE)

}