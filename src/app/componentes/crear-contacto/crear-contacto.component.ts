import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-crear-contacto',
  templateUrl: '../editar-contacto/editar-contacto.component.html',
  styleUrls: ['./crear-contacto.component.css']
})
export class CrearContactoComponent implements OnInit {

  form!: FormGroup;
  esCreacion:boolean = true;
  textoRespuesta:string = "";

  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.inicializarFormulario();

  }

  inicializarFormulario(): void{

    this.form = this.formBuilder.group({
      nombre: new FormControl('',  [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      telefono: new FormControl('',[Validators.minLength(9), Validators.maxLength(9), Validators.pattern('[0-9]{9}')]),
      segundoTelefono: new FormControl('',[Validators.minLength(9),Validators.maxLength(9), Validators.pattern('[0-9]{9}')]),
      correo: new FormControl('', [Validators.email]),
      segundoCorreo: new FormControl('', [Validators.email])
    });

  }

  onSubmit(){

    let contacto = JSON.stringify(this.form.value, null, 2);

    if (!this.form.valid) {

      return;

    }else{

      this.apiService.enviarPeticionPutCrearContacto(contacto).subscribe({
        next: data => {
          
          //this.textoRespuesta = data.texto;
          const id = data.id;
          this.router.navigate(['contactos/' + id],{ queryParams: { cc: 'ok'}});


        },
        error: error => {
        }
      })

    }
  }

  get telefonos(): FormArray { return this.form.get('telefonos') as FormArray; } 

  mostrarDialogEliminarContacto(): void{
  }

}
