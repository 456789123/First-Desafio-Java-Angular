import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario-service";
import {Usuario} from "../../models/usuario";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {createMask} from "@ngneat/input-mask";

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {

  listaUsuarios: Usuario[] = [];

  formUsuario: FormGroup;

  alteraUsuario: boolean = false;
  codigoUsuario: number | undefined;

  desabilitarBotaoIncluir: boolean = true;

  labelBotaoSalvarAlterar: string = '';

  emailInputMask = createMask({ alias: 'email' });

  constructor(
    private service: UsuarioService,
    private cdRef: ChangeDetectorRef,
    private formBuild: FormBuilder,
    private toastr: ToastrService
    ) {
    this.formUsuario = this.formBuild.group({
      nomeForm: ['', Validators.required],
      emailForm: ['', Validators.required],
      senhaForm: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.labelBotaoSalvarAlterar = 'Adicionar Usuário';

    this.service.listarUsuarios().subscribe( lista => {
      this.listaUsuarios = lista;
    },
      (error) => {
        this.handleError(error);
      });

    this.cdRef.detectChanges();
  }


  adicionarUsuario( ) {

    let usuario = new Usuario();

    if( this.alteraUsuario ) {

      this.alteraUsuario = false;

      usuario = {
        codigo: this.codigoUsuario,
        nome: this.formUsuario.value.nomeForm,
        email: this.formUsuario.value.emailForm,
        senha: this.formUsuario.value.senhaForm,
      };

      this.service.salvarUsuario(usuario).subscribe( usuario => {
        this.service.listarUsuarios().subscribe( lista => {
          this.listaUsuarios = lista;
          this.toastr.success('Usuário alterado com sucesso!', 'Usuario');
          this.labelBotaoSalvarAlterar = 'Adicionar Usuário';
        },
          (error) => {
            this.handleError(error);
          });

        this.formUsuario.reset();
        this.desabilitarBotaoIncluir = true;
      },
        (error) => {
          this.handleError(error);
        });
    } else {
      usuario = {
        codigo: undefined,
        nome: this.formUsuario.value.nomeForm,
        email: this.formUsuario.value.emailForm,
        senha: this.formUsuario.value.senhaForm,
      };

      this.service.salvarUsuario(usuario).subscribe( usuario => {
        this.listaUsuarios.push(usuario);
        this.formUsuario.reset();
        this.desabilitarBotaoIncluir = true;
        this.toastr.success('Usuário salvo com sucesso!', 'Usuario');
      },
        (error) => {
          this.handleError(error);
        });
    }
  }

  deletarUsuario(usuario: Usuario) {
    this.service.deletarUsuario(usuario).subscribe( codigo => {
      this.service.listarUsuarios().subscribe( lista => {
        this.listaUsuarios = lista;
        this.toastr.success('Usuário excluido com sucesso!', 'Usuario');
      });
    },
      (error) => {
        this.handleError(error);
      });
  }

  alterarUsuario( usuario: Usuario ) {

    this.labelBotaoSalvarAlterar = 'Alterar Usuário';

    this.alteraUsuario = true;
    this.desabilitarBotaoIncluir = false;

    this.codigoUsuario = usuario.codigo;
    this.formUsuario.get('nomeForm')?.setValue(usuario.nome);
    this.formUsuario.get('emailForm')?.setValue(usuario.email);
    this.formUsuario.get('senhaForm')?.setValue(usuario.senha);


  }

  verificarFormulario() {

   if( this.formUsuario.value.nomeForm !== '' &&
      this.formUsuario.value.emailForm !== '' &&
      this.formUsuario.value.senhaForm !== '' &&
      this.formUsuario.value.nomeForm.toString().length  >= 3 &&
      this.formUsuario.value.senhaForm.toString() !== null &&
      this.formUsuario.value.senhaForm.toString().length >= 6) {
     this.desabilitarBotaoIncluir = false;
   } else {
     this.desabilitarBotaoIncluir = true;
   }

  }


  private handleError(error: any) {
    if (error.status === 0) {
      this.toastr.error(`Ocorreu o seguinte erro: ${error.error}`, 'Erro!');
    } else {
      this.toastr.error(`Ocorreu o seguinte erro: ${error.status}`, 'Erro!');
    }
    this.toastr.error(`Aconteceu uma busca mal sucedida, tente mais tarde.`, 'Erro!');
  }
}
