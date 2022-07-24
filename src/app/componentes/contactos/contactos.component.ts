import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  columnasVisibles: string[] = ['nombre', 'apellidos', 'telefono', 'editar'];
  contactos: any;
  mensajeContactoEliminado!: string;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,) { 
    
  }

  ngOnInit(): void {
  
    let contactoEliminado: string | null = this.activatedRoute.snapshot.queryParamMap.get('ce');

    if(contactoEliminado != null && contactoEliminado === 'ok'){
      
      this.mensajeContactoEliminado = "Se ha eliminado el contacto correctamente. ";
    }

    this.apiService.enviarPeticionGetContactos().subscribe({
      next: data => {
        
        this.contactos = data;        
      },
      error: error => {
          
        console.log(error);
      }
    })
  }

  onSubmit(){
  }

}
