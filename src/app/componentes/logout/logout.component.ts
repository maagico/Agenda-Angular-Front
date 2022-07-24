import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-logout',
  template: '',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router){ 
  }

  ngOnInit(): void {

    localStorage.setItem('token', '');

    this.usuarioService.setEnContacto(false);
    this.usuarioService.setLogueado(false);

    this.router.navigate(['']);

  }

}
