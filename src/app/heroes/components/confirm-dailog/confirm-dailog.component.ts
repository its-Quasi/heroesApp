import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dailog',
  templateUrl: './confirm-dailog.component.html',
  styleUrls: []
})
export class ConfirmDailogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    this.dialogRef.close(true)
  }
}
