package com.web.persistence;

import com.web.repo.Bankaddr;
import org.springframework.data.repository.CrudRepository;

public interface BankaddrRepository extends CrudRepository <Bankaddr, Long> {

}
