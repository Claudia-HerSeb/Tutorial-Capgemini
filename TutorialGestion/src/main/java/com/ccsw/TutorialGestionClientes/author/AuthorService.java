package com.ccsw.TutorialGestionClientes.author;

import com.ccsw.TutorialGestionClientes.author.model.Author;
import com.ccsw.TutorialGestionClientes.author.model.AuthorDto;
import com.ccsw.TutorialGestionClientes.author.model.AuthorSearchDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author ccsw
 *
 */
public interface AuthorService {

    Page<Author> findAll(Pageable pageable);

    /**
     * Recupera un {@link Author} a través de su ID
     *
     * @param id PK de la entidad
     * @return {@link Author}
     */
    Author get(Long id);

    /**
     * Método para recuperar un listado paginado de {@link Author}
     *
     * @param dto dto de búsqueda
     * @return {@link Page} de {@link Author}
     */
    Page<Author> findPage(AuthorSearchDto dto);

    /**
     * Método para crear o actualizar un {@link Author}
     *
     * @param id PK de la entidad
     * @param dto datos de la entidad
     */
    void save(Long id, AuthorDto dto);

    /**
     * Método para crear o actualizar un {@link Author}
     *
     * @param id PK de la entidad
     */
    void delete(Long id) throws Exception;

}