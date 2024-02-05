package com.web.service;

import com.web.persistence.BankaddrRepository;
import com.web.repo.Bankaddr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class BankaddrServiceImpl implements BankaddrService {

    @Autowired
    private BankaddrRepository Bankaddrrepo;

    @Override
    public List<Bankaddr> getBankaddrList(Bankaddr Bankaddr) {
        return (List<com.web.repo.Bankaddr>) Bankaddrrepo.findAll();
    }

    @Override
    public void insertBankaddr(Bankaddr Bankaddr) {
        Bankaddrrepo.save(Bankaddr);
    }
}
