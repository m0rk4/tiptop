import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { WorkspaceService } from '../workspace.service';
import { Workspace } from '../workspace.model';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacePageComponent {
  workspaceId$: Observable<string>;
  workspace$: Observable<Workspace | undefined>;

  constructor(
    private route: ActivatedRoute,
    private workspaceService: WorkspaceService,
    private seo: SeoService
  ) {
    this.workspaceId$ = this.route.params.pipe(
      filter((params) => !!params['id']),
      map((params) => params['id'])
    );

    this.workspace$ = this.workspaceId$.pipe(
      switchMap((id) => this.workspaceService.workspace(id)),
      tap((workspace) =>
        this.seo.generateTags({
          title: workspace?.name,
          description: workspace?.description,
          image: workspace?.image,
        })
      )
    );
  }
}
