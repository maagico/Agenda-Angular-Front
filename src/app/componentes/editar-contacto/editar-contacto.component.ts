import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  textoModificacion: string = "";

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private formBuilder: FormBuilder) {
    
   this.inicializarFormulario()
  }

  ngOnInit(): void {
  
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.apiService.enviarPeticionGetContactoById(Number(id)).subscribe({
      next: data => {
        
        this.form = this.formBuilder.group({
          nombre: new FormControl(data.nombre,  [Validators.required]),
          apellidos: new FormControl(data.apellidos, [Validators.required]),
          telefono: new FormControl(data.telefonos[0]?.numero,[Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]{9}')]),
          segundoTelefono: new FormControl(data.telefonos[1]?.numero,[Validators.minLength(9),Validators.maxLength(9), Validators.pattern('[0-9]{9}')]),
          correo: new FormControl(data.correos[0]?.correo, [Validators.email]),
          segundoCorreo: new FormControl(data.correos[1]?.correo, [Validators.email])
        });

       console.log(data);

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
          
          this.textoModificacion = data.texto;
          
        },
        error: error => {
        }
      })

    }
  }
}
