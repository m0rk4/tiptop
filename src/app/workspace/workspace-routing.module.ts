import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspacesListComponent } from './workspaces-list/workspaces-list.component';
import { WorkspacePageComponent } from './workspace-page/workspace-page.component';
import { CreateWorkspacePageComponent } from './create-workspace-page/create-workspace-page.component';

const routes: Routes = [
  { path: '', component: WorkspacesListComponent },
  { path: 'create', component: CreateWorkspacePageComponent },
  { path: ':id', component: WorkspacePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
