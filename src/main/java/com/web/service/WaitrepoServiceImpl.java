package com.web.service;

import com.web.persistence.WaitaddrRepository;
import com.web.repo.Waitrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class WaitrepoServiceImpl implements WaitrepoService{

    @Autowired
    private WaitaddrRepository war;

    @Override
    public void insertwait(Waitrepo waitrepo) {
        war.save(waitrepo);
    }
}
