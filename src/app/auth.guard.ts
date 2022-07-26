import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from './servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  
  usuarioService: UsuarioService;

  constructor(_usuarioService: UsuarioService){
    
    this.usuarioService = _usuarioService;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    let roleRuta: string = this.getRoleRuta(route);

    let token: any = localStorage.getItem('token');

    const helper = new JwtHelperService();
    const tokenDescifrado = helper.decodeToken(token);    
    const roleToken = tokenDescifrado['ROLES'];

    let esRutaPermitida = this.comprobarRoleRuta(roleRuta, roleToken);
    
    if(roleToken == 'ROLE_USUARIO'){

      this.usuarioService.setEnContactos(true);
      this.usuarioService.setEnUsuarios(false);
    
    }else if(roleToken == 'ROLE_ADMIN'){

      this.usuarioService.setEnUsuarios(true);
      this.usuarioService.setEnContactos(false);
    }

    return esRutaPermitida;
  }

  canActivateChild(_childRoute: ActivatedRouteSnapshot): boolean {

    return false;
  }
  
  canLoad():boolean {
    return false;
  }

  private getRoleRuta(route: ActivatedRouteSnapshot): string {
    
    let rolRuta: string = "";

    if (route.data && route.data['roles']) {
     
      rolRuta = route.data['roles'];
    }

    return rolRuta;
  }

  private comprobarRoleRuta(rolesRuta: string, rolesToken: string): boolean {

    /*
    let buscarRol: boolean = true;
    let rolEncontrado: boolean = false;

    for (let i = 0; i < rolesToken.length && buscarRol; i++) {
      
      const rolToken = rolesToken[i];

      if(rolesRuta.indexOf(rolToken) != -1){
        buscarRol = false;
        rolEncontrado = true;
      }
    }
    */

    return rolesRuta == rolesToken;
  }

}
