package br.com.cadastrousuario.usuario.mapper;

import br.com.cadastrousuario.usuario.dtos.UsuarioDTO;
import br.com.cadastrousuario.usuario.model.Usuario;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UsuarioMapper {


    public List<UsuarioDTO> listaEntidadeparaListaDTO(List<Usuario> usuarios ) {
        ModelMapper modelMapper = new ModelMapper();
        return usuarios.stream().map( usuario -> modelMapper.map(usuario, UsuarioDTO.class))
                .collect(Collectors.toList());
    }

    public UsuarioDTO entidadeParaDto( Usuario usuario) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(usuario, UsuarioDTO.class);
    }

    public Usuario dtoParaEntidade( UsuarioDTO usuario) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(usuario, Usuario.class);
    }

}
