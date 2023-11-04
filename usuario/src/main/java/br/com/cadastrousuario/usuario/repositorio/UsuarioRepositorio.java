package br.com.cadastrousuario.usuario.repositorio;

import br.com.cadastrousuario.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    @Query(" SELECT user FROM Usuario user ORDER BY user.nome")
    List<Usuario> listarUsuarios();

    @Query(" SELECT user FROM Usuario user WHERE user.codigo = :codigoUsuario")
    Usuario buscarUsuario(@Param("codigoUsuario") long codigoUsuario );

    UserDetails findByLogin(String login);

    @Query(" SELECT user FROM Usuario user WHERE user.login = :email")
    Usuario loginUsuario(@Param("email") String email );

}
