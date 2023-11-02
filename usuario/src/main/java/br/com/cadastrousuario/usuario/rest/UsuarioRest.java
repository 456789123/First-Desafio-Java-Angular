package br.com.cadastrousuario.usuario.rest;


import br.com.cadastrousuario.usuario.dtos.UsuarioDTO;
import br.com.cadastrousuario.usuario.enuns.UserRole;
import br.com.cadastrousuario.usuario.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioRest {

    @Autowired
    private UsuarioService service;

    @GetMapping("")
    public String sendGreetings() {
        return "Aplicação está ONLINE!!!";
    }

    @GetMapping("/lista")
    public ResponseEntity<List<UsuarioDTO>> listarUsuarios( ) {
        return ResponseEntity.ok(service.listarUsuarios());
    }

    @GetMapping("/buscar/{codigoUsuario}")
    public ResponseEntity<UsuarioDTO> buscarUsuario( @PathVariable("codigoUsuario") long codigoUsuario ) {
        return ResponseEntity.ok(service.buscarUsuario(codigoUsuario));
    }

    @GetMapping("/login-usuario/{email}")
    public ResponseEntity<UsuarioDTO> loginUsuario( @PathVariable("email") String email ) {
        return ResponseEntity.ok(service.loginUsuario(email));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/salvar", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<UsuarioDTO> salvarUsuario(@RequestBody UsuarioDTO usuario ) {
        UsuarioDTO dto = service.salvarUsuario(usuario);
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/deletar", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Long> deletarUsuario(@RequestBody UsuarioDTO usuario ) {
        service.deletarUsuario(usuario);
        return ResponseEntity.ok(usuario.getCodigo());
    }


}


