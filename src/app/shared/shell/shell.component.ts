import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
    map((result) => result.matches),
    shareReplay(1)
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
