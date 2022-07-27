import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-dialog-eliminar-usuario',
  templateUrl: './dialog-eliminar-usuario.component.html',
  styleUrls: ['./dialog-eliminar-usuario.component.css']
})
export class DialogEliminarUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEliminarUsuarioComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private apiService: ApiService, 
    private router: Router) {
  }

  ngOnInit(): void {
  }

  eliminarUsuario(){

  this.apiService.enviarPeticionDeleteUsuarioById(Number(this.data.id)).subscribe({
    next: data => {

    this.router.navigate(['usuarios'],{ queryParams: { ue: 'ok' } });
    },
    error: error => {
      
    console.log(error);
    }
  })

  this.dialogRef.close();
  }

  cerrarDialog(){

    this.dialogRef.close();
  }

}
