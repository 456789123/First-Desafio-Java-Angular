import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ListaUsuariosComponent} from './pages/lista-usuarios/lista-usuarios.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideToastr, ToastrModule} from "ngx-toastr";
import {NoopAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {InputMaskModule} from "@ngneat/input-mask";

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    InputMaskModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpClient,
    provideAnimations(),
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
