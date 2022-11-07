import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Nullable } from '../../models/nullable.model';
import { IAuthenticationBody } from '../auth/models/authentication-body.model';

export interface IEntranceForm {
  email: FormControl<Nullable<string>>;
  password: FormControl<Nullable<string>>;
}

@Injectable()
export class EntranceFormService {
  constructor(private readonly fb: FormBuilder) {}

  public buildForm(): FormGroup<IEntranceForm> {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public buildModel({ value }: FormGroup<IEntranceForm>): IAuthenticationBody {
    return {
      email: value.email as string,
      password: value.password as string
    };
  }
}
