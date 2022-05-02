import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Board, Color, Task } from './board.model';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  /**
   * GOOD
   */
  /**
   * Creates new board for the current user
   */
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
    });
  }

  /**
   * GOOD
   */
  /**
   * Delete board
   */
  deleteBoard(boardId?: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  /**
   * GOOD
   */
  addTask(boardId: string | undefined, task: Task) {
    this.db.collection('boards').doc(boardId).collection('tasks').add(task);
  }

  /**
   * GOOD
   */
  transferTask(
    oldBoardId?: string,
    newBoardId?: string,
    oldTasks: Task[] = [],
    newTasks: Task[] = [],
    oldTaskId?: string
  ) {
    const db = firebase.firestore();
    const batch = db.batch();

    const oldTaskRef = db
      .collection('boards')
      .doc(oldBoardId)
      .collection('tasks')
      .doc(oldTaskId);
    batch.delete(oldTaskRef);

    const oldRefs = oldTasks.map((t) =>
      db.collection('boards').doc(oldBoardId).collection('tasks').doc(t.id)
    );
    const newRefs = newTasks.map((t) =>
      db.collection('boards').doc(newBoardId).collection('tasks').doc(t.id)
    );

    oldRefs.forEach((ref, idx) =>
      batch.set(ref, { ...oldTasks[idx], priority: idx })
    );
    newRefs.forEach((ref, idx) =>
      batch.set(ref, { ...newTasks[idx], priority: idx })
    );
    batch.commit();
  }

  /**
   * GOOD
   */
  /**
   * Update the tasks on board
   */
  rearrangeTasks(boardId: string | undefined, tasks: Task[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = tasks.map((t) =>
      db.collection('boards').doc(boardId).collection('tasks').doc(t.id)
    );
    refs.forEach((ref, idx) =>
      batch.set(ref, { ...tasks[idx], priority: idx })
    );
    batch.commit();
  }

  workspaceBoards(workspaceId: string) {
    return this.db
      .collection<Board>('boards', (ref) =>
        ref.where('workspaceId', '==', workspaceId).orderBy('priority')
      )
      .valueChanges({ idField: 'id' });
  }

  /**
   * GOOD
   */
  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((b) => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  /**
   * GOOD
   */
  updateBoardTitle(boardId?: string, title?: string) {
    this.db.collection('boards').doc(boardId).update({ title });
  }

  /**
   * GOOD
   */
  updateTaskDescription(
    description: string,
    boardId?: string,
    taskId?: string
  ) {
    this.db
      .collection<Board>('boards')
      .doc(boardId)
      .collection<Task>('tasks')
      .doc(taskId)
      .update({ description });
  }

  /**
   * GOOD
   */
  getBoardTasks(boardId?: string) {
    return this.db
      .collection<Board>('boards')
      .doc(boardId)
      .collection<Task>('tasks', (ref) => ref.orderBy('priority'))
      .valueChanges({ idField: 'id' });
  }

  /**
   * GOOD
   */
  updateTaskLabel(
    label: Color,
    boardId: string | undefined,
    taskId: string | undefined
  ) {
    this.db
      .collection<Board>('boards')
      .doc(boardId)
      .collection<Task>('tasks')
      .doc(taskId)
      .update({ label });
  }
}
