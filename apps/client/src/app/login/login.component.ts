import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthService } from '../services/auth/auth.service';
import { EntranceFormService, IEntranceForm } from '../services/entrance-form/entrance-form.service';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  providers: [EntranceFormService]
})
export class LoginComponent implements OnInit {
  public form!: FormGroup<IEntranceForm>;

  public isPasswordHidden = true;

  constructor(private readonly authService: AuthService, private readonly formService: EntranceFormService) {}

  public ngOnInit(): void {
    this.form = this.formService.buildForm();
  }

  public onSubmit(): void {
    const body = this.formService.buildModel(this.form);

    // TODO: Handle erros, proceed authentication..
    this.authService.login(body).pipe(untilDestroyed(this)).subscribe();
  }
}
