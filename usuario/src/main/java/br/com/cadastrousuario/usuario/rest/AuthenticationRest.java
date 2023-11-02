package br.com.cadastrousuario.usuario.rest;

import br.com.cadastrousuario.usuario.config.seguranca.TokenComponent;
import br.com.cadastrousuario.usuario.dtos.LoginResponseTDO;
import br.com.cadastrousuario.usuario.dtos.UsuarioDTO;
import br.com.cadastrousuario.usuario.model.Usuario;
import br.com.cadastrousuario.usuario.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationRest {

    @Autowired
    private AuthenticationManager authentication;

    @Autowired
    private TokenComponent tokenComponent;

    @Autowired
    private UsuarioService service;


    @PostMapping(value = "/login", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity login(@RequestBody UsuarioDTO user ) {

        if(service.loginUsuario(user.getLogin()) == null ) {
            return ResponseEntity.ok( new LoginResponseTDO(null,"Usuário não identificado!", null));
        }

        try {
            var usuarioLogado = new UsernamePasswordAuthenticationToken(user.getLogin(), user.getSenha());
            var auth = this.authentication.authenticate(usuarioLogado);
            String token = tokenComponent.geradorToken((Usuario) auth.getPrincipal());

            return ResponseEntity.ok(new LoginResponseTDO(token, "Login efetuado com sucesso!", user.getLogin()));
        } catch ( Exception e ) {
            return ResponseEntity.ok(new LoginResponseTDO(null, "Senha inválida!", null));
        }
    }
}
