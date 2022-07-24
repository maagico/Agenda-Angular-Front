import { Component, Inject, Input } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/servicios/api.service";

@Component({
    selector: 'dialog-eliminar-contacto',
    templateUrl: 'dialog-eliminar-contacto.component.html',
  })
  export class DialogEliminarContactoComponent {

    constructor(public dialogRef: MatDialogRef<DialogEliminarContactoComponent>, 
               @Inject(MAT_DIALOG_DATA) public data: any, 
               private apiService: ApiService, 
               private router: Router) {
    }

    eliminarContacto(){

      this.apiService.enviarPeticionDeleteContactoById(Number(this.data.id)).subscribe({
        next: data => {
        
          this.router.navigate(['contactos'],{ queryParams: { ce: 'ok' } });
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
