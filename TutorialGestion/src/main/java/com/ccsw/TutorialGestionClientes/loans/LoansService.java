package com.ccsw.TutorialGestionClientes.loans;

import com.ccsw.TutorialGestionClientes.loans.Model.Loans;
import com.ccsw.TutorialGestionClientes.loans.Model.LoansDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LoansService {
    Page<Loans> findAll(Pageable pageable);

    List<Loans> findAll();

    Loans findById(Long id);

    void save(Long id, LoansDto dto);

    void delete(Long id) throws Exception;
}