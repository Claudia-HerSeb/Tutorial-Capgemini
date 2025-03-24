package com.ccsw.TutorialGestionClientes.author;

import com.ccsw.TutorialGestionClientes.author.model.Author;
import com.ccsw.TutorialGestionClientes.author.model.AuthorDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

/**
 * @author ccsw
 *
 */
@Tag(name = "Author", description = "API of Author")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/author")
@RestController
public class AuthorController {

    @Autowired
    AuthorService authorService;

    @Autowired
    ModelMapper mapper;

    @Operation(summary = "Find", description = "Method that returns a list of Authors")
    @RequestMapping(path = "", method = RequestMethod.GET)
    public Page<AuthorDto> findAll(Pageable pageable) {
        return authorService.findAll(pageable).map(author -> mapper.map(author, AuthorDto.class));
    }

    @Operation(summary = "Find by ID", description = "Method that returns an Author by ID")
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public AuthorDto findById(@PathVariable Long id) {
        Author author = authorService.get(id);
        return mapper.map(author, AuthorDto.class);
    }

    @Operation(summary = "Save or Update", description = "Method that saves or updates an Author")
    @RequestMapping(path = { "", "/{id}" }, method = RequestMethod.PUT)
    public void save(@PathVariable(name = "id", required = false) Long id, @Valid @RequestBody AuthorDto dto) {
        authorService.save(id, dto);
    }

    @Operation(summary = "Delete", description = "Method that deletes an Author")
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) throws Exception {
        authorService.delete(id);
    }
}