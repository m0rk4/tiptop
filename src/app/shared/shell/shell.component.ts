import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  avatarUrl$: Observable<string | null | undefined>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private afAuth: AngularFireAuth
  ) {
    this.avatarUrl$ = afAuth.authState.pipe(
      map((it) => `url(${it?.photoURL})`)
    );
  }
}
