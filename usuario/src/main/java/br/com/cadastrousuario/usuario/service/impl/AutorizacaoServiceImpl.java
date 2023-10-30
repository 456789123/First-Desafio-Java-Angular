package br.com.cadastrousuario.usuario.service.impl;

import br.com.cadastrousuario.usuario.repositorio.UsuarioRepositorio;
import br.com.cadastrousuario.usuario.service.AutorizacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutorizacaoServiceImpl implements AutorizacaoService {

    @Autowired
    private UsuarioRepositorio repositorio;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return repositorio.findByLogin(email);
    }
}
