import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    let roleRuta: string = this.getRoleRuta(route);

    const helper = new JwtHelperService();
   
    let token: any = localStorage.getItem('token');

    const tokenDescifrado = helper.decodeToken(token);    
    const roleToken = tokenDescifrado['ROLES'];

    let esRutaPermitida = this.comprobarRoleRuta(roleRuta, roleToken);
 
    return esRutaPermitida;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {

    return false;
  }
  
  canLoad():boolean {
    return false;
  }

  private getRoleRuta(route: ActivatedRouteSnapshot): string {
    
    let permisoRuta: string = "";

    if (route.data && route.data['roles']) {
     
      permisoRuta = route.data['roles'];
    }

    return permisoRuta;
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
