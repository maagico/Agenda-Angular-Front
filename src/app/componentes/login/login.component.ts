import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;
  errorValidacion: string = "";
  form!: FormGroup;
  submitted = false;
  mensajeCuentaCreada = "";

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,){
  }
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });

    let cuentaCreada: string | null = this.activatedRoute.snapshot.queryParamMap.get('cc');

    if(cuentaCreada != null && cuentaCreada === 'ok'){
      
      this.mensajeCuentaCreada = "Se ha creado la cuenta correctamente. ";
    }
  }

  onSubmit(): void {
    
    let usuario = JSON.stringify(this.form.value, null, 2);
    
    console.log(usuario);

    if (this.form.invalid) {

      return;

    }else{

      this.errorValidacion = "Usuario o password incorrectos";
    }
    
  }
  
}
