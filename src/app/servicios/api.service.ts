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

  public enviarPeticionGetBuscadorContactos(textoABuscar: any): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/contactos?buscar=" + textoABuscar);
  }

  public enviarPeticionPutCrearContacto(contacto: string): Observable<any>{

    let correoJSON = JSON.parse(contacto);
    
    const nombre = correoJSON['nombre'];
    const apellidos = correoJSON['apellidos'];
    const telefono = correoJSON['telefono'];
    const segundoTelefono = correoJSON['segundoTelefono'];
    const correo = correoJSON['correo'];
    const segundoCorreo = correoJSON['segundoCorreo'];

    const params = new HttpParams()
      .set('nombre', nombre)
      .set('apellidos', apellidos)
      .set('telefono', telefono)
      .set('segundoTelefono', segundoTelefono)
      .set('correo', correo)
      .set('segundoCorreo', segundoCorreo);

    return this.httpClient.post<any>(this.REST_API_URL + "/contactos/", params);
  }

  public enviarPeticionPutModificarContacto(id: number, contacto: string): Observable<any>{

    let correoJSON = JSON.parse(contacto);
    
    const nombre = correoJSON['nombre'];
    const apellidos = correoJSON['apellidos'];
    const telefono = correoJSON['telefono'];
    const segundoTelefono = correoJSON['segundoTelefono'];
    const correo = correoJSON['correo'];
    const segundoCorreo = correoJSON['segundoCorreo'];

    const params = new HttpParams()
      .set('nombre', nombre)
      .set('apellidos', apellidos)
      .set('telefono', telefono)
      .set('segundoTelefono', segundoTelefono)
      .set('correo', correo)
      .set('segundoCorreo', segundoCorreo);
      
    return this.httpClient.put<any>(this.REST_API_URL + "/contactos/" + id,  params);
  } 

  public enviarPeticionDeleteContactoById(id: number) {
    
    return this.httpClient.delete<any>(this.REST_API_URL + "/contactos/" + id);
  }

  public enviarPeticionGetRoles(): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/roles");
  }

  public enviarPeticionGetUsuarios(): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/usuarios");
  }

  public enviarPeticionGetBuscadorUsuarios(textoABuscar: any): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/usuarios?buscar=" + textoABuscar);
  }

  public enviarPeticionDeleteUsuarioById(id: number) {
    
    return this.httpClient.delete<any>(this.REST_API_URL + "/usuarios/" + id);
  }
}
