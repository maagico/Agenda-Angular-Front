import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContactosComponent } from './componentes/contactos/contactos.component';
import { EditarContactoComponent } from './componentes/editar-contacto/editar-contacto.component';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'contactos',
    component: ContactosComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USUARIO']
    }
  },
  {
    path: 'contactos/:id',
    component: EditarContactoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USUARIO']
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_USUARIO']
    }
  }  


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
    ]
    
})
export class AppRoutingModule { }
