import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent {
  boards$: Observable<Board[]>;

  constructor(public boardService: BoardService, public dialog: MatDialog) {
    this.boards$ = this.boardService.userBoards();
  }

  onBoardDropped(event: CdkDragDrop<Board[]>) {
    const boards = event.container.data;
    moveItemInArray(boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(boards);
  }

  trackBoard(index: number, board: Board | undefined) {
    return board?.id;
  }

  openBoardDialog(boards: Board[]): void {
    this.dialog
      .open(BoardDialogComponent, { width: '400px' })
      .afterClosed()
      .subscribe((result) => {
        this.boardService.createBoard({
          title: result,
          priority: boards.length,
        });
      });
  }
}
