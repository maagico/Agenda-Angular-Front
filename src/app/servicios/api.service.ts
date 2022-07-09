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
        
    //let  headers = new HttpHeaders();
    //headers = headers.set("Authorization", "Bearer 11231313123132132131");
  
    return this.httpClient.post<any>(this.REST_API_URL + "/login",  params);
  } 

  public enviarPeticionGetRoles(): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/roles");
  }
}
