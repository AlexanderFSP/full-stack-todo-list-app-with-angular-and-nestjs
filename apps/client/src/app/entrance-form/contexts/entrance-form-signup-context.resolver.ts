import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { EntranceFormSignupContext } from './entrance-form-signup.context';

@Injectable()
export class EntranceFormSignupContextResolver implements Resolve<EntranceFormSignupContext> {
  constructor(private readonly authService: AuthService) {}

  public resolve(): EntranceFormSignupContext {
    return new EntranceFormSignupContext(this.authService);
  }
}
