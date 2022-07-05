import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private formBuilder: FormBuilder){
  }
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {

    console.log(JSON.stringify(this.form.value, null, 2));

    
    
    if (this.form.invalid) {

      return;

    }else{

      this.errorValidacion = "Usuario o password incorrectos";
    }
    
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  
}
