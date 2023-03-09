import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'confirm-modal',
  templateUrl: 'confirm-modal.component.html',
})
export class ConfirmModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
