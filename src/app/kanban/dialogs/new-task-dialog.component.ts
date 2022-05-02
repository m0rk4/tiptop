import { Component } from '@angular/core';
import { Color } from '../board.model';

@Component({
  selector: 'app-new-task-dialog',
  styleUrls: ['./dialog.scss'],
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <input
          autocomplete="off"
          matInput
          placeholder="Name"
          [(ngModel)]="name"
        />
      </mat-form-field>
      <br />
      <app-color-switcher
        [initialLabel]="'purple'"
        (labelChange)="label = $event"
      ></app-color-switcher>
    </div>
    <div mat-dialog-actions>
      <button
        mat-button
        [disabled]="!name"
        [mat-dialog-close]="{name, label}"
        cdkFocusInitial
      >
        Add Task
      </button>
    </div>
  `,
})
export class NewTaskDialogComponent {
  name = '';
  label: Color = 'purple';
}
