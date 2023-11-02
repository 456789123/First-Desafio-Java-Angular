package br.com.cadastrousuario.usuario;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GerarSenha {

    /**
     *
     * Classe para gerar a promeira senha
     * no caso 123456
     *
     **/
    public static void main(String[] args) {
        System.out.println(new BCryptPasswordEncoder().encode(new String("123456")));
    }
}
