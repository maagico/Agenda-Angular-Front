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

    
      this.apiService.enviarPeticionPostUsuario(usuario).subscribe((usuario: string)=>{
        
        let respuesta = JSON.stringify(usuario, null, 2);
        
        console.log(respuesta);

        this.router.navigate([''],{ queryParams: { cc: 'ok' } });
      })

      this.errorSignup = "El usuario seleccionado ya existe";
      
    }
  }
}
