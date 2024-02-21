package com.web.service;


import com.web.repo.ParkingEntity;

import java.util.List;

public interface ParkService {

    List<ParkingEntity> getParkingList(ParkingEntity pe);
	
	void insertParking(ParkingEntity pe);

}
