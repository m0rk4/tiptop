import { Component } from '@angular/core';

@Component({
  selector: 'app-new-task-dialog',
  styleUrls: ['./dialog.scss'],
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <input matInput placeholder="Name" [(ngModel)]="name" />
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">{{
            opt === 'gray' ? 'check_circle' : 'lens'
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="{name, label}" cdkFocusInitial>
        Add Task
      </button>
    </div>
  `,
})
export class NewTaskDialogComponent {
  readonly labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];
  name = '';
  label = 'purple';
}
