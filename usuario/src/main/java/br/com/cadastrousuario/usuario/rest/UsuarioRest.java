package br.com.cadastrousuario.usuario.rest;


import br.com.cadastrousuario.usuario.dtos.UsuarioDTO;
import br.com.cadastrousuario.usuario.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioRest {

    @Autowired
    private UsuarioService service;

    @GetMapping("")
    public String sendGreetings() {
        return "Usuario ONLINE!!!";
    }

    @GetMapping("/lista")
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios( ) {
        return ResponseEntity.ok(service.listarUsuarios());
    }

    @GetMapping("/buscar/{codigoUsuario}")
    public ResponseEntity<UsuarioDTO> buscarUsuario( @PathVariable("codigoUsuario") long codigoUsuario ) {
        return ResponseEntity.ok(service.buscarUsuario(codigoUsuario));
    }

}


