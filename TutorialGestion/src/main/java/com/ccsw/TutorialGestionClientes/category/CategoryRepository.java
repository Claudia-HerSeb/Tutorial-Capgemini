package com.ccsw.TutorialGestionClientes.category;

import com.ccsw.TutorialGestionClientes.category.model.Category;
import org.springframework.data.repository.CrudRepository;

/**
 * @author ccsw
 *
 */
public interface CategoryRepository extends CrudRepository<Category, Long> {

}