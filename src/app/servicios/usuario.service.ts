import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    setToken(token: string){
        
        localStorage.setItem('token', token);
    }

    quitarToken(){
        
        localStorage.setItem('token', '');
    }

    setLogueado(logueado: boolean) {

        localStorage.setItem("logueado", logueado.toString());
    }

    estaLogueado(): boolean{

        return localStorage.getItem("logueado") === 'true';
    }

    setEnContactos(enContacto: boolean) {

        localStorage.setItem("enContacto", enContacto.toString());
    }

    estaEnContacto(): boolean {

        return localStorage.getItem("enContacto") === 'true';
    }

    setEnUsuarios(enUsuarios: boolean) {

        localStorage.setItem("enUsuarios", enUsuarios.toString());
    }

    estaEnUsuario(): boolean {

        return localStorage.getItem("enUsuarios") === 'true';
    }
}