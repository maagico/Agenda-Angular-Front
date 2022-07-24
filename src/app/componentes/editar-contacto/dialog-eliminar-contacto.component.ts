import { Component, Inject, Input } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'dialog-eliminar-contacto',
    templateUrl: 'dialog-eliminar-contacto.component.html',
  })
  export class DialogEliminarContactoComponent {

    constructor(public dialogRef: MatDialogRef<DialogEliminarContactoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    eliminarContacto(){

      console.log(this.data.id);
      this.dialogRef.close();
    }

    cerrarDialog(){
      
      this.dialogRef.close();
    }
}
