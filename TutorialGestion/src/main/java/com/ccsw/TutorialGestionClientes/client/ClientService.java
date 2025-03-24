package com.ccsw.TutorialGestionClientes.client;

import com.ccsw.TutorialGestionClientes.client.Model.Client;
import com.ccsw.TutorialGestionClientes.client.Model.ClientDto;

import java.util.List;

public interface ClientService {
    /**
     * Recupera una {@link Client} a partir de su ID
     *
     * @param id PK de la entidad
     * @return {@link Client}
     */
    Client get(Long id);

    /**
     * Método para recuperar todas las {@link Client}
     *
     * @return {@link List} de {@link Client}
     */
    List<Client> findAll();

    /**
     * Método para crear o actualizar una {@link Client}
     *
     * @param id PK de la entidad
     * @param dto datos de la entidad
     */
    void save(Long id, ClientDto dto);

    /**
     * Método para borrar una {@link Client}
     *
     * @param id PK de la entidad
     */
    void delete(Long id) throws Exception;
}