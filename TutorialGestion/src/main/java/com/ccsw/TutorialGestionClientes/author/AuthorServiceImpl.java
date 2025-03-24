package com.ccsw.TutorialGestionClientes.author;

import com.ccsw.TutorialGestionClientes.author.model.Author;
import com.ccsw.TutorialGestionClientes.author.model.AuthorDto;
import com.ccsw.TutorialGestionClientes.author.model.AuthorSearchDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author ccsw
 *
 */
@Service
@Transactional
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    AuthorRepository authorRepository;

    @Override
    public Page<Author> findAll(Pageable pageable) {
        return authorRepository.findAll(pageable);
    }

    @Override
    public Author get(Long id) {
        return this.authorRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Author> findPage(AuthorSearchDto dto) {
        return this.authorRepository.findAll(dto.getPageable().getPageable());
    }

    @Override
    public void save(Long id, AuthorDto data) {
        Author author;
        if (id == null) {
            author = new Author();
        } else {
            author = this.get(id);
        }
        BeanUtils.copyProperties(data, author, "id");
        if (author.getName() == null || author.getName().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        this.authorRepository.save(author);
    }

    @Override
    public void delete(Long id) throws Exception {
        if (this.get(id) == null) {
            throw new Exception("Not exists");
        }
        this.authorRepository.deleteById(id);
    }
}