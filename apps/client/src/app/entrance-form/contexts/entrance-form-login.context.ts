import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { IAuthenticationBody } from '../../services/auth/models/authentication-body.model';
import { IJwtPayload } from '../../services/auth/models/jwt-payload.model';
import { IEntranceFormContext } from './entrance-form-context.model';

export class EntranceFormLoginContext implements IEntranceFormContext {
  public readonly submitButtonText = 'Login';

  constructor(private readonly authService: AuthService) {}

  public submit(body: IAuthenticationBody): Observable<IJwtPayload> {
    return this.authService.login(body);
  }
}