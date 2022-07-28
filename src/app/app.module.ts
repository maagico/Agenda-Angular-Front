import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from "@angular/material/autocomplete";

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './componentes/comun/footer/footer.component';
import { HeaderComponent } from './componentes/comun/header/header.component';
import { LoginComponent } from './componentes/login/login.component';
import { SignupComponent } from './componentes/signup/signup.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactosComponent } from './componentes/contactos/contactos.component';
import { EditarContactoComponent } from './componentes/editar-contacto/editar-contacto.component';
import { AuthInterceptorService } from './servicios/auth.interceptor.service';
import { UsuarioService } from './servicios/usuario.service';
import { DialogEliminarContactoComponent } from './componentes/dialog-eliminar-contacto/dialog-eliminar-contacto.component';
import { CrearContactoComponent } from './componentes/crear-contacto/crear-contacto.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { DialogEliminarUsuarioComponent } from './componentes/dialog-eliminar-usuario/dialog-eliminar-usuario.component';
import { UsuarioContactosComponent } from './componentes/usuario-contactos/usuario-contactos.component';

@NgModule({
  declarations: [ 
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ContactosComponent,
    EditarContactoComponent,
    DialogEliminarContactoComponent,
    CrearContactoComponent,
    UsuariosComponent,
    UsuarioContactosComponent,
    LogoutComponent,
    DialogEliminarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: UsuarioService,
      useClass: UsuarioService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
