package com.web.persistence;

import com.web.repo.Bankaddr;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BankaddrRepository extends CrudRepository <Bankaddr, Long> {
    @Query(value="SELECT * FROM bankaddr WHERE brcd=:brcd", nativeQuery = true)
    Bankaddr findByBrcd(@Param("brcd") String brcd);
}
