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
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      roleId: ['', Validators.required],
    });

    this.apiService.enviarPeticionGetRoles().subscribe((roles: Object)=>{
      console.log(roles);
      this.roles = roles;
    })  

  }

  onSubmit(): void {

    let usuario = JSON.stringify(this.form.value, null, 2);
    
    if (this.form.invalid) {

      return;

    }else{

    
      this.apiService.enviarPeticionPostLoginUsuario(usuario).subscribe(data => {
         
        console.log(data.token);

        //this.router.navigate(['']);
      })

      this.errorSignup = "El usuario seleccionado ya existe";
      
    }
  }
}
