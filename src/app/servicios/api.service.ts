import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_URL: string = "http://localhost:8080/api"; 

  constructor(private httpClient: HttpClient) { 
  }

  public enviarPeticionPostLoginUsuario(usuario: string): Observable<any>{

    let usuarioJSON = JSON.parse(usuario);
    
    const username = usuarioJSON['username'];
    const password = usuarioJSON['password'];

    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
  
    return this.httpClient.post<any>(this.REST_API_URL + "/login",  params);
  } 

  public enviarPeticionPostCrearCuenta(usuario: string): Observable<any>{

    let usuarioJSON = JSON.parse(usuario);
    
    const username = usuarioJSON['username'];
    const password = usuarioJSON['password'];
    const roleId = usuarioJSON['roleId'];

    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('roleId', roleId);
      
    return this.httpClient.post<any>(this.REST_API_URL + "/cuentas",  params);
  } 

  public enviarPeticionGetContactos(): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/contactos");
  }

  public enviarPeticionGetContactoById(id: number): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/contactos/" + id);
  }

  public enviarPeticionPutModificarContacto(id: number, contacto: string): Observable<any>{

    let usuarioJSON = JSON.parse(contacto);
    
    const nombre = usuarioJSON['nombre'];
    const apellidos = usuarioJSON['apellidos'];
    const telefono = usuarioJSON['telefono'];
    //const segundoTelefono = usuarioJSON['segundoTelefono'];

    const params = new HttpParams()
      .set('nombre', nombre)
      .set('apellidos', apellidos)
      .set('telefono', telefono);
      
    return this.httpClient.put<any>(this.REST_API_URL + "/contactos/" + id,  params);
  } 

  public enviarPeticionGetRoles(): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/roles");
  }
}
