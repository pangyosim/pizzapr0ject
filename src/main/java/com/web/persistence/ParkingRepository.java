package com.web.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.repo.ParkingEntity;

@Repository
public interface ParkingRepository extends JpaRepository<ParkingEntity, Long> {
    
}
