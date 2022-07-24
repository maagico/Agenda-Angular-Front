import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { DialogEliminarContactoComponent } from './dialog-eliminar-contacto.component';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.css']
})
export class EditarContactoComponent implements OnInit {

  id!:string;
  form!: FormGroup;
  esCreacion: boolean = false;
  contacto: any;
  textoRespuesta: string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private formBuilder: FormBuilder, public dialog: MatDialog) {
    
   this.inicializarFormulario()
  }

  ngOnInit(): void {

    let contactoEliminado: string | null = this.activatedRoute.snapshot.queryParamMap.get('cc');

    if(contactoEliminado != null && contactoEliminado === 'ok'){
      
      this.textoRespuesta = "Se ha creado el contacto correctamente. ";
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.apiService.enviarPeticionGetContactoById(Number(this.id)).subscribe({
      next: data => {
        
        this.form = this.formBuilder.group({
          nombre: new FormControl(data.nombre,  [Validators.required]),
          apellidos: new FormControl(data.apellidos, [Validators.required]),
          telefono: new FormControl(data.telefonos[0]?.numero,[Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]{9}')]),
          segundoTelefono: new FormControl(data.telefonos[1]?.numero,[Validators.minLength(9),Validators.maxLength(9), Validators.pattern('[0-9]{9}')]),
          correo: new FormControl(data.correos[0]?.correo, [Validators.email]),
          segundoCorreo: new FormControl(data.correos[1]?.correo, [Validators.email])
        });
      },
      error: error => {
          
        console.log(error);
      }
    })

  }

  inicializarFormulario(): void{

    this.form = this.formBuilder.group({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      telefono: new FormControl(''),
      segundoTelefono: new FormControl(''),
      correo: new FormControl(''),
      segundoCorreo: new FormControl('')
    });

  }

  onSubmit(){

    let contacto = JSON.stringify(this.form.value, null, 2);

    if (!this.form.valid) {

      return;

    }else{

      const id = this.activatedRoute.snapshot.paramMap.get('id');

      this.apiService.enviarPeticionPutModificarContacto(Number(id), contacto).subscribe({
        next: data => {
          
          this.textoRespuesta = data.texto;
          
        },
        error: error => {
        }
      })

    }
  }

  mostrarDialogEliminarContacto(){
    
    this.dialog.open(DialogEliminarContactoComponent, {
       width: '350px', 
       data:{id: this.id}
    });
 }

}

