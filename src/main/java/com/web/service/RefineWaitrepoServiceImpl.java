package com.web.service;

import com.web.persistence.RefinewaitRepository;
import com.web.repo.RefineWaitrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RefineWaitrepoServiceImpl implements RefineWaitrepoService{

    @Autowired
    private RefinewaitRepository rwp;
    @Override
    public List<RefineWaitrepo> getWaitrepoList(RefineWaitrepo rw) {
        return (List<RefineWaitrepo>) rwp.findAll();
    }
}
