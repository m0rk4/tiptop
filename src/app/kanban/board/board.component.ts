import { Component, Input } from '@angular/core';
import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: Board | undefined;

  constructor(private boardService: BoardService, private dialog: MatDialog) {}

  taskDrop(event: CdkDragDrop<Board | undefined>) {
    if (BoardComponent.isDroppedFromSameContainer(event)) {
      moveItemInArray(
        this.board?.tasks ?? [],
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data?.tasks ?? [],
        event.container.data?.tasks ?? [],
        event.previousIndex,
        event.currentIndex
      );
      const previousBoard = event.previousContainer.data;
      this.boardService.updateTasks(
        previousBoard?.id,
        previousBoard?.tasks ?? []
      );
    }
    this.boardService.updateTasks(this.board?.id, this.board?.tasks ?? []);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board?.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this.boardService.updateTasks(this.board?.id, [
            ...(this.board?.tasks ?? []),
            result.task,
          ]);
        } else {
          const update = this.board?.tasks ?? [];
          update.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(
            this.board?.id,
            this.board?.tasks ?? []
          );
        }
      }
    });
  }

  handleDelete() {
    this.boardService.deleteBoard(this.board?.id);
  }

  private static isDroppedFromSameContainer<T>(event: CdkDragDrop<T>) {
    return event.container === event.previousContainer;
  }
}
