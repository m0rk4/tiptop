import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
})
export class WorkspacePageComponent implements OnInit {
  workspaceId: string | undefined;
  workspace: Observable<any> | undefined;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.workspaceId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.workspace = this.db
      .collection('workspaces')
      .doc<any>(this.workspaceId)
      .valueChanges()
      .pipe(
        tap((workspace) =>
          this.seo.generateTags({
            title: workspace.name,
            description: workspace.description,
            image: workspace.image,
          })
        )
      );
  }
}
