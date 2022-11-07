import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { IAuthenticationBody } from '../../services/auth/models/authentication-body.model';
import { ITokenPair } from '../../services/auth/models/token-pair.model';
import { IEntranceFormContext } from './entrance-form-context.model';

export class EntranceFormSignupContext implements IEntranceFormContext {
  public readonly submitButtonText = 'Sign Up';

  constructor(private readonly authService: AuthService) {}

  public submit(body: IAuthenticationBody): Observable<ITokenPair> {
    return this.authService.signup(body);
  }
}
