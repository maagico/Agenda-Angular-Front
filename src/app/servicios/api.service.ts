import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private REST_API_URL: string = "http://localhost:8080/api"; 

  constructor(private httpClient: HttpClient) { 
  }

  public enviarPeticionGetRoles(): Observable<any>{

    return this.httpClient.get<any>(this.REST_API_URL + "/roles");
  }

  public enviarPeticionPostUsuario(usuario: string): Observable<any>{

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    
    return this.httpClient.post<any>(this.REST_API_URL + "/usuarios", usuario, options);
  } 
   
}
