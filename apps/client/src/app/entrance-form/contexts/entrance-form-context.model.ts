import { Observable } from 'rxjs';

import { IAuthenticationBody } from '../../services/auth/models/authentication-body.model';
import { IJwtPayload } from '../../services/auth/models/jwt-payload.model';

export interface IEntranceFormContext {
  submitButtonText: string;
  submit(body: IAuthenticationBody): Observable<IJwtPayload>;
}
