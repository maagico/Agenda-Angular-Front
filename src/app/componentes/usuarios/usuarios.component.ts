import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { DialogEliminarUsuarioComponent } from '../dialog-eliminar-usuario/dialog-eliminar-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  form!: FormGroup;
  columnasVisibles: string[] = ['usuario', 'ver-contactos', 'borrar-usuario'];
  usuarios: any;
  mensajeUsuarioEliminado!: string;
  mostrarDeshacerBusqueda = false;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,private formBuilder: FormBuilder, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
  
    this.form = this.formBuilder.group({
      buscador: new FormControl('')
    })

    const usuarioEliminado: string | null = this.activatedRoute.snapshot.queryParamMap.get('ue');

    if(usuarioEliminado != null && usuarioEliminado === 'ok'){
      
      this.mensajeUsuarioEliminado = "Se ha eliminado el usuario correctamente. ";
    }

    this.apiService.enviarPeticionGetUsuarios().subscribe({
      next: data => {
        
        this.usuarios = data;        
      },
      error: error => {
          
        console.log(error);
      }
    })
  }

  onSubmit(){
    
    const textoABuscar = this.form.value['buscador'];

    if(textoABuscar != ""){
      
      this.apiService.enviarPeticionGetBuscadorUsuarios(textoABuscar).subscribe({
        next: data => {
          
          this.usuarios = data;   
          this.mostrarDeshacerBusqueda = true;
          this.mensajeUsuarioEliminado = "";
          
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

    this.apiService.enviarPeticionGetBuscadorUsuarios(textoABuscar).subscribe({
      next: data => {
        
        this.usuarios = data;   
        this.mostrarDeshacerBusqueda = false; 
        
        this.form.patchValue({buscador: ''})
      }
    })   
  }

  mostrarDialogEliminarUsuario(id: string): void{

    console.log(id);
    this.dialog.open(DialogEliminarUsuarioComponent, {
      width: '350px', 
      data:{id: id}
   });
  }

}
