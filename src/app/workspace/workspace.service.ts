import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Workspace } from './workspace.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  createWorkspace(workspace: Workspace) {
    return this.afAuth.authState.pipe(
      filter((user) => !!user),
      take(1),
      switchMap((user) =>
        this.db.collection('workspaces').add({
          ...workspace,
          uid: user?.uid,
        })
      )
    );
  }
}
