package br.com.cadastrousuario.usuario.model;

import br.com.cadastrousuario.usuario.enuns.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name="TB_USUARIO")
@SequenceGenerator( name = "co_seq_usuario", sequenceName = "co_seq_usuario", allocationSize = 1, initialValue = 1)
public class Usuario implements UserDetails, Serializable {

    private static final long serialVersionUID = -2338626292552177485L;

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "co_seq_usuario" )
    @Column(name="COD_USUARIO")
    private Long codigo;
    private String nome;

    @Column(name="EMAIL")
    private String login;
    private String senha;
    private String role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role.equals(UserRole.ADMIN.getRole())) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Usuário está bloqueado?
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Usuário está expirado?
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Usuário está átivo?
    */

    @Override
    public boolean isEnabled() {
        return true;
    }
}
