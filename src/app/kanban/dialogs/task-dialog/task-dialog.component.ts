import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardService } from '../../board.service';
import { Color } from '../../board.model';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSaveDescription(newDescription: string) {
    this.boardService.updateTaskDescription(
      newDescription,
      this.data.board.id,
      this.data.task.id
    );
  }

  changeLabel(label: Color) {
    this.boardService.updateTaskLabel(
      label,
      this.data.board.id,
      this.data.task.id
    );
  }
}
