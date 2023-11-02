package br.com.cadastrousuario.usuario.service;

import br.com.cadastrousuario.usuario.dtos.UsuarioDTO;

import java.util.List;

public interface UsuarioService {

    List<UsuarioDTO> listarUsuarios();

    UsuarioDTO buscarUsuario( long codigoUsuario );

    UsuarioDTO loginUsuario( String email );

    UsuarioDTO salvarUsuario( UsuarioDTO usuario );

    void deletarUsuario( UsuarioDTO usuario );

}
