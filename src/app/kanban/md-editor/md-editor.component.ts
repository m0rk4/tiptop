import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-md-editor',
  templateUrl: './md-editor.component.html',
  styleUrls: ['./md-editor.component.scss'],
})
export class MdEditorComponent {
  @Input() set description(description: string) {
    this.current = description;
    this._description = description;
  }

  @Output() save = new EventEmitter<string>();

  current = '';
  _description = '';

  isEditing = true;

  toggleState() {
    this.isEditing = !this.isEditing;
  }

  onSave() {
    this._description = this.current;
    this.isEditing = !this.isEditing;
    this.save.emit(this.current);
  }

  onCancel() {
    this.current = this._description;
    this.isEditing = !this.isEditing;
  }
}
