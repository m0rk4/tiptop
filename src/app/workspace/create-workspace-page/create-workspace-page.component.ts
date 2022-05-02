import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorkspaceService } from '../workspace.service';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { SnackService } from '../../services/snack.service';

@Component({
  selector: 'app-create-workspace-page',
  templateUrl: './create-workspace-page.component.html',
  styleUrls: ['./create-workspace-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWorkspacePageComponent {
  private _isLoading$ = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this._isLoading$;

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(255)]],
    image: ['', [Validators.required, this.createUrlValidator()]],
  });

  constructor(
    private fb: FormBuilder,
    private workspaceService: WorkspaceService,
    private snackService: SnackService
  ) {}

  onSubmit() {
    this._isLoading$.next(true);
    this.workspaceService
      .createWorkspace(this.form.getRawValue())
      .pipe(
        finalize(() => {
          this._isLoading$.next(false);
          this.form.reset();
          this.name?.setErrors(null);
          this.description?.setErrors(null);
          this.image?.setErrors(null);
          this.snackService.message('Workspace successfully created!');
        })
      )
      .subscribe();
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get image() {
    return this.form.get('image');
  }

  createUrlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return { invalid: true };
      }
      const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ); // fragment locator
      const isValidUrl = pattern.test(value);
      return !isValidUrl ? { invalid: true } : null;
    };
  }
}
