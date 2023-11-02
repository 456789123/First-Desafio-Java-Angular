import {Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../models/usuario";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  apiUrl = `${environment.localHost}/auth`

  constructor( private http: HttpClient ) {
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, usuario);
  }

}
