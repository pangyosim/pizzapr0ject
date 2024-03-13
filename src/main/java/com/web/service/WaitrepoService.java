package com.web.service;

import com.web.repo.Waitrepo;

import java.util.List;

public interface WaitrepoService {

    List<Waitrepo> getWaitrepoList(Waitrepo waitrepo);
    void insertwait(Waitrepo waitrepo);
}
