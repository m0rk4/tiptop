import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Workspace } from '../workspace.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workspaces-list',
  templateUrl: './workspaces-list.component.html',
  styleUrls: ['./workspaces-list.component.scss'],
})
export class WorkspacesListComponent implements OnInit {
  workspaces: Observable<Workspace[]> | undefined;

  constructor(private seo: SeoService, private db: AngularFirestore) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Workspace List',
      description: 'A list filled with workspaces',
    });

    this.workspaces = this.db
      .collection<Workspace>('workspaces')
      .valueChanges({ idField: 'id' });
  }
}
