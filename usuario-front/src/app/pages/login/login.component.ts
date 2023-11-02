import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createMask} from "@ngneat/input-mask";
import {Usuario} from "../../models/usuario";
import {LoginService} from "../../services/login-service";
import {ToastrService} from "ngx-toastr";
import {UsuarioService} from "../../services/usuario-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() isLogin = new EventEmitter<boolean>();

  formLogin: FormGroup;

  emailInputMask = createMask({ alias: 'email' });

  desabilitarBotao: boolean = true;

  constructor(
    private formBuild: FormBuilder,
    private service: LoginService,
    private toastr: ToastrService,
    private serviceUsuario: UsuarioService

  ) {

    this.formLogin = this.formBuild.group({
      emailForm: ['', Validators.required],
      senhaForm: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }


  verificarFormulario() {

    if(
      this.formLogin.value.emailForm !== null &&
      this.formLogin.value.emailForm !== '' &&
      this.formLogin.value.senhaForm !== '' &&
      this.formLogin.value.senhaForm.toString() !== null &&
      this.formLogin.value.senhaForm.toString().length >= 6) {
      this.desabilitarBotao = false;
    } else {
      this.desabilitarBotao = true;
    }

  }

  validarUsuario() {

    const usuario = {
      login: this.formLogin.value.emailForm,
      senha: this.formLogin.value.senhaForm,
    };

    this.service.login(usuario).subscribe( resultado => {
      if( null !== resultado.token ) {
        localStorage.setItem('token', resultado.token);
        localStorage.setItem('email', resultado.email);
        this.isLogin.emit(true);
        this.toastr.success(resultado.mensagem, 'Login');
      } else {
        this.toastr.error(resultado.mensagem, 'Login');
      }

    });

  }

}
