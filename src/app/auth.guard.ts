import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    let rolesRuta: Array<string> = this.getRolesRuta(route);

    const helper = new JwtHelperService();
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c3VhcmlvIiwiUk9MRVMiOiJVU1VBUklPIn0.yMd0jMMiuKvjwNOJ6nAAVBOWPOZC95vx87bj5SPxVtS7fnCXbkKG2AQTrK8g2nD97qhKVIGyD-1Mo5r0K5vumw"

    const tokenDescifrado =helper.decodeToken(token);    

    console.log(tokenDescifrado['sub']);

    let rutaPermitida = this.comprobarRolesRuta(rolesRuta);

    console.log(rutaPermitida);

    //console.log("Ruta permitida" + rutaPermitida);

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {

    return false;
  }
  
  canLoad():boolean {
    return false;
  }

  private getRolesRuta(route: ActivatedRouteSnapshot): Array<string> {
    
    let permisosRuta: Array<string> = [];

    if (route.data && route.data['roles']) {
     
      permisosRuta = route.data['roles'];
    }

    return permisosRuta;
  }

  private comprobarRolesRuta(rolesRuta: Array<string>): boolean {
    
    let rolesToken: Array<string> = ['USUARIO', 'ADMIN'];
    let buscarRol: boolean = true;
    let rolEncontrado: boolean = false;

    for (let index = 0; index < rolesToken.length && buscarRol; index++) {
      
      const rolToken = rolesToken[index];

      if(rolesRuta.indexOf(rolToken) != -1){
        buscarRol = false;
        rolEncontrado = true;
      }
    }

    return rolEncontrado;
  }

}
