package com.ccsw.TutorialGestionClientes.loans;

import com.ccsw.TutorialGestionClientes.loans.Model.Loans;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface LoansRepository extends CrudRepository<Loans, Long>, JpaSpecificationExecutor<Loans> {
    Page<Loans> findAll(Pageable pageable);

    @Query("SELECT l FROM Loans l WHERE l.gameTitle = :gameTitle AND ((l.startDate <= :endDate AND l.endDate >= :startDate))")
    List<Loans> findOverlappingLoans(@Param("gameTitle") String gameTitle, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT l FROM Loans l WHERE l.clientName = :clientName AND ((l.startDate <= :endDate AND l.endDate >= :startDate))")
    List<Loans> findClientLoans(@Param("clientName") String clientName, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
