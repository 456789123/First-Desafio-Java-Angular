package br.com.cadastrousuario.usuario.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="TB_USUARIO")
@SequenceGenerator( name = "co_seq_usuario", sequenceName = "co_seq_usuario", allocationSize = 1, initialValue = 1)
public class Usuario implements Serializable {

    private static final long serialVersionUID = -2338626292552177485L;

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "co_seq_usuario" )
    @Column(name="COD_USUARIO")
    private Long codigo;
    private String nome;
    private String email;
    private String senha;
}
