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
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
    ]
    
})
export class AppRoutingModule { }
