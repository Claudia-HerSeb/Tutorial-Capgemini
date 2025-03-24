package com.ccsw.TutorialGestionClientes.game;

import com.ccsw.TutorialGestionClientes.game.model.Game;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author ccsw
 *
 */
public interface GameRepository extends CrudRepository<Game, Long>, JpaSpecificationExecutor<Game> {
    @Override
    @EntityGraph(attributePaths = { "category", "author" })
    List<Game> findAll(Specification<Game> spec);

    // Método para encontrar un juego por título
    Optional<Game> findByTitle(String title);
}