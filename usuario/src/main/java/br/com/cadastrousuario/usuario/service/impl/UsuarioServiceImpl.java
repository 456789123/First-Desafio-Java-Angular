package br.com.cadastrousuario.usuario.service.impl;

import br.com.cadastrousuario.usuario.dtos.UsuarioDTO;
import br.com.cadastrousuario.usuario.enuns.UserRole;
import br.com.cadastrousuario.usuario.mapper.UsuarioMapper;
import br.com.cadastrousuario.usuario.model.Usuario;
import br.com.cadastrousuario.usuario.repositorio.UsuarioRepositorio;
import br.com.cadastrousuario.usuario.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepositorio repositorio;

    @Autowired
    private UsuarioMapper modelMapper;

    @Override
    public List<UsuarioDTO> listarUsuarios() {
        List<Usuario> lista = repositorio.findAll();
        lista.forEach( usuario -> usuario.setSenha(""));
        return modelMapper.listaEntidadeparaListaDTO(lista);
    }

    @Override
    public UsuarioDTO buscarUsuario(long codigoUsuario) {
        Usuario usuario = repositorio.buscarUsuario(codigoUsuario);
        usuario.setSenha("");
        return modelMapper.entidadeParaDto(usuario);
    }

    @Override
    public UsuarioDTO salvarUsuario(UsuarioDTO usuarioDto) {

        if(null == usuarioDto.getRole()) {
            usuarioDto.setRole(UserRole.USER.getRole());
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(usuarioDto.getSenha());
        usuarioDto.setSenha(encryptedPassword);

        return modelMapper.entidadeParaDto(repositorio.save(modelMapper.dtoParaEntidade(usuarioDto)));
    }

    @Override
    public void deletarUsuario(UsuarioDTO usuarioDto) {
        Usuario usuario = modelMapper.dtoParaEntidade(usuarioDto);
        repositorio.delete(usuario);
    }


}
