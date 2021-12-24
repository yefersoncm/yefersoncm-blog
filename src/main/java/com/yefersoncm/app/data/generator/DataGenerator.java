package com.yefersoncm.app.data.generator;

import com.vaadin.exampledata.DataType;
import com.vaadin.exampledata.ExampleDataGenerator;
import com.vaadin.flow.spring.annotation.SpringComponent;
import com.yefersoncm.app.data.entity.Categorias;
import com.yefersoncm.app.data.entity.Posts;
import com.yefersoncm.app.data.entity.Usuarios;
import com.yefersoncm.app.data.service.CategoriasRepository;
import com.yefersoncm.app.data.service.PostsRepository;
import com.yefersoncm.app.data.service.UsuariosRepository;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringComponent
public class DataGenerator {

    @Bean
    public CommandLineRunner loadData(CategoriasRepository categoriasRepository, PostsRepository postsRepository,
            UsuariosRepository usuariosRepository) {
        return args -> {
            Logger logger = LoggerFactory.getLogger(getClass());
            if (categoriasRepository.count() != 0L) {
                logger.info("Using existing database");
                return;
            }
            int seed = 123;

            logger.info("Generating demo data");

            logger.info("... generating 100 Categorias entities...");
            ExampleDataGenerator<Categorias> categoriasRepositoryGenerator = new ExampleDataGenerator<>(
                    Categorias.class, LocalDateTime.of(2021, 12, 24, 0, 0, 0));
            categoriasRepositoryGenerator.setData(Categorias::setId, DataType.ID);
            categoriasRepositoryGenerator.setData(Categorias::setNombre, DataType.WORD);
            categoriasRepositoryGenerator.setData(Categorias::setDescripcion, DataType.SENTENCE);
            categoriasRepository.saveAll(categoriasRepositoryGenerator.create(100, seed));

            logger.info("... generating 100 Posts entities...");
            ExampleDataGenerator<Posts> postsRepositoryGenerator = new ExampleDataGenerator<>(Posts.class,
                    LocalDateTime.of(2021, 12, 24, 0, 0, 0));
            postsRepositoryGenerator.setData(Posts::setId, DataType.ID);
            postsRepositoryGenerator.setData(Posts::setTitulo, DataType.BOOK_TITLE);
            postsRepositoryGenerator.setData(Posts::setDescripcion, DataType.SENTENCE);
            postsRepositoryGenerator.setData(Posts::setTags, DataType.TWO_WORDS);
            postsRepositoryGenerator.setData(Posts::setTexto, DataType.SENTENCE);
            postsRepositoryGenerator.setData(Posts::setImagenPrincipal, DataType.WORD);
            postsRepositoryGenerator.setData(Posts::setCategoria, DataType.WORD);
            postsRepositoryGenerator.setData(Posts::setEstado, DataType.NUMBER_UP_TO_10);
            postsRepositoryGenerator.setData(Posts::setCreatedAt, DataType.DATETIME_LAST_10_YEARS);
            postsRepositoryGenerator.setData(Posts::setUpdatedAt, DataType.DATETIME_LAST_10_YEARS);
            postsRepository.saveAll(postsRepositoryGenerator.create(100, seed));

            logger.info("... generating 100 Usuarios entities...");
            ExampleDataGenerator<Usuarios> usuariosRepositoryGenerator = new ExampleDataGenerator<>(Usuarios.class,
                    LocalDateTime.of(2021, 12, 24, 0, 0, 0));
            usuariosRepositoryGenerator.setData(Usuarios::setId, DataType.ID);
            usuariosRepositoryGenerator.setData(Usuarios::setNombre, DataType.FIRST_NAME);
            usuariosRepositoryGenerator.setData(Usuarios::setApellido, DataType.LAST_NAME);
            usuariosRepositoryGenerator.setData(Usuarios::setCorreo, DataType.EMAIL);
            usuariosRepositoryGenerator.setData(Usuarios::setTelefono, DataType.PHONE_NUMBER);
            usuariosRepositoryGenerator.setData(Usuarios::setFechaDeNacimiento, DataType.DATE_OF_BIRTH);
            usuariosRepositoryGenerator.setData(Usuarios::setRol, DataType.OCCUPATION);
            usuariosRepositoryGenerator.setData(Usuarios::setActivo, DataType.BOOLEAN_50_50);
            usuariosRepositoryGenerator.setData(Usuarios::setCreatedAt, DataType.DATETIME_LAST_10_YEARS);
            usuariosRepositoryGenerator.setData(Usuarios::setUpdatedAt, DataType.DATETIME_LAST_10_YEARS);
            usuariosRepository.saveAll(usuariosRepositoryGenerator.create(100, seed));

            logger.info("Generated demo data");
        };
    }

}