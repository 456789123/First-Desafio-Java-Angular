import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListaUsuariosComponent} from './pages/lista-usuarios/lista-usuarios.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideToastr, ToastrModule} from "ngx-toastr";
import {NoopAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {InputMaskModule} from "@ngneat/input-mask";
import {JwtInterceptor} from "./auth/jwt.interceptor";
import { LoginComponent } from './pages/login/login.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputMaskModule,
    ConfirmPopupModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpClient,
    provideAnimations(),
    provideToastr(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
