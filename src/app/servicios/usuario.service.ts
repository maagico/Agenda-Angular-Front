import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    public setLogueado(logueado: boolean) {

        sessionStorage.setItem("logueado", String(logueado));
    }

    public estaLogueado(): boolean {

        return Boolean(sessionStorage.getItem("logueado"));
    }

    public setEnContacto(enContacto: boolean) {

        sessionStorage.setItem("enContacto", String(enContacto));
    }

    public estaEnContacto(): boolean {

        return Boolean(sessionStorage.getItem("enContacto"));
    }


}