import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  roles: any;
  form!: FormGroup;
  errorSignup:string = "";

  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private apiService: ApiService){
  }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleId: ['', Validators.required],
    });

    this.apiService.enviarPeticionGetRoles().subscribe({
      next: data => {

        this.roles = data;
      },
      error: error => {
            
      }
    })
  }

  onSubmit(): void {

    let usuarioForm = JSON.stringify(this.form.value, null, 2);
    
    if (this.form.invalid) {

      return;

    }else{

      this.apiService.enviarPeticionPostCrearCuenta(usuarioForm).subscribe({
        next: data => {

          const ok: boolean = data.ok;
          
          if(ok){

            this.router.navigate([''],{ queryParams: { cc: 'ok' } });
          }
        },
        error: error => {
             
          const ok: boolean = error.ok;

          if(!ok){

            this.errorSignup = "El usuario ya existe, por favor selecciona otro";
          }
        }
      })
    }
  }
}
