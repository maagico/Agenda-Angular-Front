import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-usuario-contactos',
  templateUrl: './usuario-contactos.component.html',
  styleUrls: ['./usuario-contactos.component.css']
})
export class UsuarioContactosComponent implements OnInit {

  contactos: any;
  columnasVisibles: string[] = ['nombre', 'apellidos', 'telefono', 'correo'];

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
console.log(" ID "+ id);
    this.apiService.enviarPeticionGetUsuarioContactos(id).subscribe({
      next: data => {
        
        this.contactos = data;        
      },
      error: error => {
          
        console.log(error);
      }
    });
  }

}
