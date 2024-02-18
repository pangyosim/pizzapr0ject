package com.web.persistence;

import com.web.repo.Waitrepo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WaitaddrRepository extends CrudRepository<Waitrepo,String> {

}
