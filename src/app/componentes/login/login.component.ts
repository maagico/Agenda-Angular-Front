import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/servicios/api.service';
import { UsuarioService } from "src/app/servicios/usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ocultarCabecera:boolean = true;
  errorValidacion: string = "";
  form!: FormGroup;
  submitted = false;
  mensajeCuentaCreada:string = "";

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router, 
              private apiService: ApiService,
              private usuarioService: UsuarioService){
  }
  
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    let cuentaCreada: string | null = this.activatedRoute.snapshot.queryParamMap.get('cc');

    if(cuentaCreada != null && cuentaCreada === 'ok'){
      
      this.mensajeCuentaCreada = "Se ha creado la cuenta correctamente. ";
    }
  }

  onSubmit(): void {
    
    let usuario = JSON.stringify(this.form.value, null, 2);

    this.mensajeCuentaCreada = "";

    if (this.form.invalid) {

      return;

    }else{

      this.apiService.enviarPeticionPostLoginUsuario(usuario).subscribe({
        next: data => {
          
          let ok: boolean = data.ok;
          let token = data.token;

          this.usuarioService.setToken(token);

          if(ok){

            this.errorValidacion = "";

            const helper = new JwtHelperService();
            let token: any = localStorage.getItem('token');

            const tokenDescifrado = helper.decodeToken(token);    
            const roleToken = tokenDescifrado['ROLES'];            
            console.log("LoginComponent " + roleToken);

            // Si es rol ROLE_USUARIO que vaya a contactos, en caso 
            //de que sea ROLE_ADMIN va a usuarios

            this.usuarioService.setLogueado(true);
            this.usuarioService.setEnContacto(true);
            this.router.navigate(['contactos']);
          }
        },
        error: error => {
            
          this.errorValidacion = "Usuario o password incorrectos";
        }
      })

    }
    
  }
  
}
