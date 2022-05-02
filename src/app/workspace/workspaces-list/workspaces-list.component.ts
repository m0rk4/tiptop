import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { Workspace } from '../workspace.model';
import { Observable } from 'rxjs';
import { WorkspaceService } from '../workspace.service';

@Component({
  selector: 'app-workspaces-list',
  templateUrl: './workspaces-list.component.html',
  styleUrls: ['./workspaces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacesListComponent implements OnInit {
  workspaces: Observable<Workspace[]>;

  constructor(
    private seo: SeoService,
    private workspaceService: WorkspaceService
  ) {
    this.workspaces = this.workspaceService.userWorkspaces();
  }

  ngOnInit() {
    this.seo.generateTags({
      title: 'Workspace List',
      description: 'A list filled with workspaces',
    });
  }
}
