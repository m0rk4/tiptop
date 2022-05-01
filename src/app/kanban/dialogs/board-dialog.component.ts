import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-board-dialog',
  template: `
    <h1 mat-dialog-title>Board</h1>
    <mat-dialog-content>
      <p>What shall we call this board?</p>
      <mat-form-field>
        <input placeholder="title" matInput [(ngModel)]="name" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="name">Create</button>
    </mat-dialog-actions>
  `,
})
export class BoardDialogComponent {
  name = '';

  constructor(private dialogRef: MatDialogRef<BoardDialogComponent>) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
