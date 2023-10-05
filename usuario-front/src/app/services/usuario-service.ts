import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  apiUrl = `${environment.localHost}/usuario`


  constructor( private http: HttpClient, private toastr: ToastrService ) {
  }

  listarUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lista`);
  }

  salvarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/salvar`, usuario);
  }

  deletarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/deletar`, usuario);
  }

}
