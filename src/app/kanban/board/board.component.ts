import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Board, Task } from '../board.model';
import { BoardService } from '../board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NewTaskDialogComponent } from '../dialogs/new-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  board$: Observable<Board | null>;
  tasks$: Observable<Task[]> | undefined;

  private _board$ = new BehaviorSubject<Board | null>(null);

  @Input() set board(board: Board) {
    this._board$.next(board);
  }

  constructor(private boardService: BoardService, private dialog: MatDialog) {
    this.board$ = this._board$;
    this.tasks$ = this.board$.pipe(
      filter((board) => !!board),
      switchMap((board) => this.boardService.getBoardTasks(board?.id))
    );
  }

  taskDrop(event: CdkDragDrop<{ board: Board; tasks: Task[] }>) {
    const { board: currentBoard, tasks: currentBoardTasks } =
      event.container.data;
    const { board: previousBoard, tasks: previousBoardTasks } =
      event.previousContainer.data;
    if (BoardComponent.isDroppedFromSameContainer(event)) {
      moveItemInArray(
        currentBoardTasks,
        event.previousIndex,
        event.currentIndex
      );
      this.boardService.rearrangeTasks(currentBoard?.id, currentBoardTasks);
      return;
    }

    const oldTaskId = previousBoardTasks[event.previousIndex];
    transferArrayItem(
      previousBoardTasks,
      currentBoardTasks,
      event.previousIndex,
      event.currentIndex
    );
    this.boardService.transferTask(
      previousBoard.id,
      currentBoard.id,
      previousBoardTasks,
      currentBoardTasks,
      oldTaskId?.id
    );
  }

  trackTask(index: number, task: Task) {
    return task.id;
  }

  openTaskDialog(task: Task, board: Board) {
    this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task, board },
    });
  }

  openDialog(boardId?: string, tasks?: Task[]): void {
    this.dialog
      .open(NewTaskDialogComponent, { width: '500px' })
      .afterClosed()
      .subscribe((result?: Task) => {
        if (result) {
          this.boardService.rearrangeTasks(boardId, [
            ...(tasks ?? []),
            { label: result.label, name: result.name, priority: tasks?.length },
          ]);
        }
      });
  }

  handleDelete(boardId?: string) {
    this.boardService.deleteBoard(boardId);
  }

  private static isDroppedFromSameContainer<T>(event: CdkDragDrop<T>) {
    return event.container === event.previousContainer;
  }
}
