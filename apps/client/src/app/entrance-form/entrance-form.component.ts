import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IEntranceFormContext } from './contexts/entrance-form-context.model';
import { EntranceFormService, IEntranceForm } from './services/entrance-form/entrance-form.service';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'app-entrance-form',
  templateUrl: './entrance-form.component.html',
  styleUrls: ['./entrance-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  providers: [EntranceFormService]
})
export class EntranceFormComponent implements OnInit {
  public form!: FormGroup<IEntranceForm>;

  public isPasswordHidden = true;

  constructor(private readonly route: ActivatedRoute, private readonly formService: EntranceFormService) {}

  public get context(): IEntranceFormContext {
    return (this.route.snapshot.data as { context: IEntranceFormContext }).context;
  }

  public ngOnInit(): void {
    this.form = this.formService.buildForm();
  }

  public onSubmit(): void {
    const body = this.formService.buildModel(this.form);

    // TODO: Handle errors, proceed authentication..
    this.context.submit(body).pipe(untilDestroyed(this)).subscribe();
  }
}
