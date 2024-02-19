package com.web.repo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name="parking")
public class ParkingEntity {
    
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long seq;

	@Column(name="type")
	private String type;

	@Column(name = "lat")
	private double lat;
	@Column(name="lng")
	private double lng;

	@Column(name="pkstatus")
	private String pkstatus;

	@Column(name="pkrule")
	private String pkrule;

	@Column(name="endweek")
	private String endweek;
	@Column(name = "beginweek")
	private String beginweek;

	@Column(name = "paytype")
	private String paytype;
	@Column(name = "saturdaypay")
	private String saturdaypay;
	@Column(name = "saturdaypayyn")
	private String saturdaypayyn;

	@Column(name = "pkname")
	private String pkname;

	@Column(name = "endholi")
	private String endholi;
	@Column(name = "beginholi")
	private String beginholi;
	@Column(name = "paytypeholi")
	private String paytypeholi;
	@Column(name = "holipayyn")
	private String holipayyn;

	@Column(name = "fullmon")
	private int fullmon;

	@Column(name = "pkaddr")
	private String pkaddr;
	@Column(name = "pkcode")
	private String pkcode;

	@Column(name = "tel")
	private String tel;

	@Column(name = "nightyn")
	private String nightyn;


}
