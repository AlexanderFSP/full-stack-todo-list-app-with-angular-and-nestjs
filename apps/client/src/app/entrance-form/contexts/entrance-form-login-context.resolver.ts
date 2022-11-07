import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { EntranceFormLoginContext } from './entrance-form-login.context';

@Injectable()
export class EntranceFormLoginContextResolver implements Resolve<EntranceFormLoginContext> {
  constructor(private readonly authService: AuthService) {}

  public resolve(): EntranceFormLoginContext {
    return new EntranceFormLoginContext(this.authService);
  }
}
