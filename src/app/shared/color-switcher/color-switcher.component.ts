import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Color } from '../../kanban/board.model';

@Component({
  selector: 'app-color-switcher',
  templateUrl: './color-switcher.component.html',
  styleUrls: ['./color-switcher.component.scss'],
})
export class ColorSwitcherComponent {
  readonly labelOptions: Color[] = [
    'purple',
    'blue',
    'green',
    'yellow',
    'red',
    'gray',
  ];
  @Input() vertical = false;
  @Input() initialLabel: Color = 'purple';
  @Output() labelChange = new EventEmitter<Color>();
}
