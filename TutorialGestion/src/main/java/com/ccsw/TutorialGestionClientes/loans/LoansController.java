package com.ccsw.TutorialGestionClientes.loans;

import com.ccsw.TutorialGestionClientes.loans.Model.LoansDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Loans", description = "API of Loans")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/loans")
@RestController
public class LoansController {

    @Autowired
    private LoansService loanService;

    @Operation(summary = "Find", description = "Method that returns a list of Loans")
    @RequestMapping(path = "", method = RequestMethod.GET)
    public Page<LoansDto> findAll(Pageable pageable) {
        return loanService.findAll(pageable).map(LoansDto::new);
    }

    @Operation(summary = "Find by ID", description = "Method that returns a Loan by ID")
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public LoansDto findById(@PathVariable Long id) {
        return new LoansDto(loanService.findById(id));
    }

    @Operation(summary = "Save or Update", description = "Method that saves or updates a Loan")
    @RequestMapping(path = { "", "/{id}" }, method = RequestMethod.PUT)
    public void save(@PathVariable(name = "id", required = false) Long id, @RequestBody LoansDto dto) {
        loanService.save(id, dto);
    }

    @Operation(summary = "Delete", description = "Method that deletes a Loan")
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) throws Exception {
        loanService.delete(id);
    }
}