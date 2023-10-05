package br.com.cadastrousuario.usuario.repositorio;

import br.com.cadastrousuario.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepositorio extends JpaRepository<Usuario, String> {

    @Query(" SELECT user FROM Usuario user WHERE user.codigo = :codigoUsuario")
    Usuario buscarUsuario(@Param("codigoUsuario") long codigoUsuario );

}
