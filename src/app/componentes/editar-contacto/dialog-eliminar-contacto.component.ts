import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'dialog-eliminar-contacto',
    templateUrl: 'dialog-eliminar-contacto.component.html',
  })
  export class DialogEliminarContactoComponent {
    
    constructor(public dialogRef: MatDialogRef<DialogEliminarContactoComponent>) {}
    
    eliminarContacto(){
      this.dialogRef.close();
    }

    cerrarDialog(){
      this.dialogRef.close();
    }
}
