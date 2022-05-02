import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Board } from '../board.model';
import { BoardService } from '../board.service';
import { filter, from, map, Observable, switchMap } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent {
  workspaceId$: Observable<string>;
  boards$: Observable<Board[]>;

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute
  ) {
    this.workspaceId$ = this.activateRoute.params.pipe(
      filter((params) => !!params['workspaceId']),
      map((params) => params['workspaceId'])
    );
    this.boards$ = this.workspaceId$.pipe(
      switchMap((workspaceId) => this.boardService.workspaceBoards(workspaceId))
    );
  }

  onBoardDropped(event: CdkDragDrop<Board[]>) {
    const boards = event.container.data;
    moveItemInArray(boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(boards);
  }

  trackBoard(index: number, board: Board | undefined) {
    return board?.id;
  }

  openBoardDialog(boards: Board[], workspaceId: string): void {
    this.dialog
      .open(BoardDialogComponent, { width: '400px' })
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        switchMap((result) =>
          from(
            this.boardService.createBoard({
              title: result,
              priority: boards.length,
              workspaceId,
            })
          )
        )
      )
      .subscribe();
  }
}
