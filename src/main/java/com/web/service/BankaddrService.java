package com.web.service;

import com.web.repo.Bankaddr;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BankaddrService {
    List<Bankaddr> getBankaddrList(Bankaddr Bankaddr);
    void insertBankaddr(Bankaddr Bankaddr);
}
