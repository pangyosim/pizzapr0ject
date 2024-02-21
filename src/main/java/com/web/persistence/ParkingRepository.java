package com.web.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.web.repo.ParkingEntity;

@Repository
public interface ParkingRepository extends CrudRepository<ParkingEntity, Long> {
    
}
