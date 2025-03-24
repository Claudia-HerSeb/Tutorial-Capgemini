package com.ccsw.TutorialGestionClientes.client;

import com.ccsw.TutorialGestionClientes.client.Model.Client;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ClientRepository extends CrudRepository<Client, Long> {
    Optional<Client> findByName(String name);
}
