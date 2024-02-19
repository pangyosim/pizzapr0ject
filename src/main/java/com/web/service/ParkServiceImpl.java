package com.web.service;

import com.web.persistence.ParkingRepository;
import com.web.repo.ParkingEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkServiceImpl implements ParkService {

    @Autowired
    ParkingRepository pr;
    @Override
    public List<ParkingEntity> getParkingList(ParkingEntity pe) {
        return (List<ParkingEntity>) pr.findAll();
    }

    @Override
    public void insertParking(ParkingEntity pe) {
        pr.save(pe);
    }
}