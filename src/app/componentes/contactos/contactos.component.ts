import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  form!: FormGroup;
  columnasVisibles: string[] = ['nombre', 'apellidos', 'telefono', 'editar'];
  contactos: any;
  mensajeContactoEliminado!: string;
  mostrarDeshacerBusqueda = false;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
  
    this.form = this.formBuilder.group({
      buscador: new FormControl('')
    })

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
    
    const textoABuscar = this.form.value['buscador'];

    if(textoABuscar != ""){
      
      this.apiService.enviarPeticionGetBuscador(textoABuscar).subscribe({
        next: data => {
          
          this.contactos = data;   
          this.mostrarDeshacerBusqueda = true;
          this.mensajeContactoEliminado = "";
          
        },
        error: error => {
            
          console.log(error);

          this.mostrarDeshacerBusqueda = false;   
        }
      })
    }

  }

  deshacerBusqueda(){

    const textoABuscar = "";

    this.apiService.enviarPeticionGetBuscador(textoABuscar).subscribe({
      next: data => {
        
        this.contactos = data;   
        this.mostrarDeshacerBusqueda = false; 
        
        this.form.patchValue({buscador: ''})
      }
    })   
  }

}
