import { Observable } from 'rxjs';

import { IAuthenticationBody } from '../../services/auth/models/authentication-body.model';
import { ITokenPair } from '../../services/auth/models/token-pair.model';

export interface IEntranceFormContext {
  submitButtonText: string;
  submit(body: IAuthenticationBody): Observable<ITokenPair>;
}
