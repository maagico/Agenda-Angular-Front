import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.css']
})
export class EditarContactoComponent implements OnInit {

  form!: FormGroup;
  contacto: any;
  
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.inicializarFormulario();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.apiService.enviarPeticionGetContactoById(Number(id)).subscribe({
      next: data => {
        
        this.form.setValue({
   
          nombre: [data.nombre],
          apellidos: [data.apellidos],
          telefono: [data.telefonos[0]?.numero],
          segundoTelefono: [data.telefonos[1]?.numero],
          correo: [data.correos[0]?.correo],
          segundoCorreo: [data.correos[1]?.correo]   
       })

       console.log(data);

      },
      error: error => {
          
        console.log(error);
      }
    })

  }

  inicializarFormulario():void{

    this.form = this.formBuilder.group({
      nombre: ['',  Validators.required],
      apellidos: ['',  Validators.required],
      telefono: new FormControl(),
      segundoTelefono: new FormControl(),
      correo: new FormControl(),
      segundoCorreo: new FormControl()
    });

  }

  onSubmit(){

    let contacto = JSON.stringify(this.form.value, null, 2);

    if (this.form.invalid) {

      return;

    }else{

      const id = this.activatedRoute.snapshot.paramMap.get('id');

      this.apiService.enviarPeticionPutModificarContacto(Number(id), contacto).subscribe({
        next: data => {
          
          console.log("asd");
          
        },
        error: error => {
        }
      })

    }
  }

}
