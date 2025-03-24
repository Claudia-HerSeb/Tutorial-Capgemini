package com.ccsw.TutorialGestionClientes.loans;

import com.ccsw.TutorialGestionClientes.loans.Model.Loans;
import com.ccsw.TutorialGestionClientes.loans.Model.LoansDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class LoansServiceImpl implements LoansService {

    @Autowired
    private LoansRepository loansRepository;

    @Override
    public Page<Loans> findAll(Pageable pageable) {
        return loansRepository.findAll(pageable);
    }

    @Override
    public List<Loans> findAll() {
        return (List<Loans>) loansRepository.findAll();
    }

    @Override
    public Loans findById(Long id) {
        return loansRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Long id, LoansDto dto) {
        Loans loan;
        if (id != null) {
            loan = loansRepository.findById(id).orElse(new Loans());
        } else {
            loan = new Loans();
        }

        // Validaciones
        Date startDate = dto.getStartDate();
        Date endDate = dto.getEndDate();

        // Validación 1: La fecha de fin no puede ser anterior a la fecha de inicio
        if (endDate.before(startDate)) {
            throw new IllegalArgumentException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }

        // Validación 2: El periodo de préstamo máximo solo podrá ser de 14 días
        long difInMillies = Math.abs(endDate.getTime() - startDate.getTime());
        long dif = TimeUnit.DAYS.convert(difInMillies, TimeUnit.MILLISECONDS);
        if (dif > 14) {
            throw new IllegalArgumentException("El periodo de préstamo máximo es de 14 días.");
        }

        // Validación 3: El mismo juego no puede estar prestado a dos clientes distintos en un mismo día
        List<Loans> superposedLoans = loansRepository.findOverlappingLoans(dto.getGameTitle(), startDate, endDate);
        if (!superposedLoans.isEmpty()) {
            throw new IllegalArgumentException("El mismo juego no puede estar prestado a dos clientes distintos en un mismo día.");
        }

        // Validación 4: Un mismo cliente no puede tener prestados más de 2 juegos en un mismo día
        List<Loans> clientLoans = loansRepository.findClientLoans(dto.getClientName(), startDate, endDate);
        if (clientLoans.size() >= 2) {
            throw new IllegalArgumentException("Un mismo cliente no puede tener prestados más de 2 juegos en un mismo día.");
        }

        loan.setClientName(dto.getClientName());
        loan.setGameTitle(dto.getGameTitle());
        loan.setStartDate(dto.getStartDate());
        loan.setEndDate(dto.getEndDate());

        loansRepository.save(loan);
    }

    @Override
    public void delete(Long id) throws Exception {
        loansRepository.deleteById(id);
    }
}
