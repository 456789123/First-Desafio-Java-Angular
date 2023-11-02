import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsuarioService} from '../../services/usuario-service';
import {Usuario} from '../../models/usuario';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {createMask} from '@ngneat/input-mask';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
})
export class ListaUsuariosComponent implements OnInit {

  @Output() isLogin = new EventEmitter<boolean>();

  usuarioLogado: Usuario = new Usuario();
  listaUsuarios: Usuario[] = [];
  formUsuario: FormGroup;
  alteraUsuario: boolean = false;
  codigoUsuario: number | undefined;
  desabilitarBotaoIncluir: boolean = true;
  labelBotaoSalvarAlterar: string = '';

  emailInputMask = createMask({ alias: 'email' });

  roleUsuario: string | undefined = '';

  showModalConfirmacao: boolean = false;
  messageTitulo: string = '';
  acaoExecutar: string = '';
  selectUsuario: Usuario = new Usuario();

  constructor(
    private service: UsuarioService,
    private cdRef: ChangeDetectorRef,
    private formBuild: FormBuilder,
    private toastr: ToastrService,
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

      const email = localStorage.getItem('email');
      if (email) {
        this.service.loginUsuario(email).subscribe( usuario => {
          this.usuarioLogado = usuario;
        });
      }

    },
      (error) => {
        this.handleError(error);
      });

    this.cdRef.detectChanges();
  }


  adicionarUsuario( ) {


    if( this.alteraUsuario ) {

      this.acaoExecutar = 'ALTERAR';
      this.messageTitulo = `Deseja realmente alterar o usuário ${this.formUsuario.value.nomeForm}?`;
      this.showModalConfirmacao = true;


    } else {
      const usuario = {
        codigo: undefined,
        nome: this.formUsuario.value.nomeForm,
        login: this.formUsuario.value.emailForm,
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

    this.selectUsuario = usuario;
    this.acaoExecutar = 'EXCLUIR';
    this.messageTitulo = `Deseja realmente excluir o usuário ${usuario.nome}?`;
    this.showModalConfirmacao = true;

  }

  alterarUsuario( usuario: Usuario ) {

    this.labelBotaoSalvarAlterar = 'Alterar Usuário';

    this.alteraUsuario = true;
    this.desabilitarBotaoIncluir = false;

    this.codigoUsuario = usuario.codigo;
    this.formUsuario.get('nomeForm')?.setValue(usuario.nome);
    this.formUsuario.get('emailForm')?.setValue(usuario.login);

    this.roleUsuario = usuario.role;

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

    localStorage.clear();
    this.isLogin.emit(false);
  }

  fazerLogout( ) {
    this.acaoExecutar = 'SAIR';
    this.messageTitulo = 'Deseja realmente sair?';
    this.showModalConfirmacao = true;
  }

  calcel(event: boolean) {
    this.showModalConfirmacao = event;
  }

  acaoNecessaria(acao: string) {

    switch (acao) {
      case 'SAIR' :
        localStorage.clear();
        this.isLogin.emit(false);
        break;

      case 'EXCLUIR' :

        this.service.deletarUsuario(this.selectUsuario).subscribe( codigo => {
            this.service.listarUsuarios().subscribe( lista => {
              this.listaUsuarios = lista;
              this.showModalConfirmacao = false;
              this.toastr.success('Usuário excluido com sucesso!', 'Usuario');
            });
          },
          (error) => {
            this.handleError(error);
          });

        break;

      case 'ALTERAR' :

        this.aleracaoUsuario( );
        break;

      default: break;
    }

  }


  aleracaoUsuario( ) {
    this.alteraUsuario = false;

    const usuario = {
      codigo: this.codigoUsuario,
      nome: this.formUsuario.value.nomeForm,
      login: this.formUsuario.value.emailForm,
      senha: this.formUsuario.value.senhaForm,
      role: this.roleUsuario
    };

    this.service.salvarUsuario(usuario).subscribe( usuario => {
        this.service.listarUsuarios().subscribe( lista => {
            this.listaUsuarios = lista;
            this.showModalConfirmacao = false;
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
  }
}

