import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  columnasVisibles: string[] = ['nombre', 'apellidos', 'telefono', 'editar'];
  contactos: any;

  constructor(private apiService: ApiService) { 
    
  }

  ngOnInit(): void {
  
    this.apiService.enviarPeticionGetContactos().subscribe({
      next: data => {
        
        this.contactos = data;        
      },
      error: error => {
          
        console.log(error);
      }
    })
  }

}
