package com.ccsw.TutorialGestionClientes.loans.Model;

import java.util.Date;

public class LoansDto {
    private Long id;
    private String clientName;
    private String gameTitle;
    private Date startDate;
    private Date endDate;

    // Constructor sin argumentos
    public LoansDto() {
    }

    // Constructor que toma un objeto Loans
    public LoansDto(Loans loan) {
        this.id = loan.getId();
        this.clientName = loan.getClientName();
        this.gameTitle = loan.getGameTitle();
        this.startDate = loan.getStartDate();
        this.endDate = loan.getEndDate();
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getGameTitle() {
        return gameTitle;
    }

    public void setGameTitle(String gameTitle) {
        this.gameTitle = gameTitle;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
