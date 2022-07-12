import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { ContactosComponent } from './componentes/contactos/contactos.component';

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
