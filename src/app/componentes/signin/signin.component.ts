import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  roles: any;
  form!: FormGroup;
  errorSignin:string = "";

  constructor(private formBuilder: FormBuilder, 
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

      this.apiService.enviarPeticionPostUsuario(usuario).subscribe((usuario: Object)=>{
        
        console.log(usuario);
      })

      this.errorSignin = "El usuario seleccionado ya existe";
      
    }
  }
}
