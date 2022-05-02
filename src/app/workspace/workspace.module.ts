import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspacesListComponent } from './workspaces-list/workspaces-list.component';
import { WorkspacePageComponent } from './workspace-page/workspace-page.component';
import { CreateWorkspacePageComponent } from './create-workspace-page/create-workspace-page.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    WorkspacesListComponent,
    WorkspacePageComponent,
    CreateWorkspacePageComponent,
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule,
    MatIconModule,
  ],
})
export class WorkspaceModule {}
