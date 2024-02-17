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

@Entity
@Getter
@Setter
@ToString
@Table(name="parking_entity")
public class ParkingEntity {
    
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
    private Long id;
	@Column(name="PARKING_CODE")
    private String PARKING_CODE;
	@Column(name="PARKING_NAME")
    private String PARKING_NAME;
	@Column(name="PAY_NM")
    private String PAY_NM;
	@Column(name="LAT")
    private double LAT;
	@Column(name="LNG")
    private double LNG;
	private String ADDR;
	
    
	
    
}
