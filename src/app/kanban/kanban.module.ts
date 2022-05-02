import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { NewTaskDialogComponent } from './dialogs/new-task-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { MdEditorComponent } from './md-editor/md-editor.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

@NgModule({
  declarations: [
    BoardListComponent,
    BoardComponent,
    BoardDialogComponent,
    NewTaskDialogComponent,
    TaskDialogComponent,
    MdEditorComponent,
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
  entryComponents: [
    BoardDialogComponent,
    NewTaskDialogComponent,
    TaskDialogComponent,
  ],
})
export class KanbanModule {}
