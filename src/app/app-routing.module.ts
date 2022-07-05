import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { SigninComponent } from './componentes/signin/signin.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  } 

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    RouterModule
  ]
})
export class AppRoutingModule { }
