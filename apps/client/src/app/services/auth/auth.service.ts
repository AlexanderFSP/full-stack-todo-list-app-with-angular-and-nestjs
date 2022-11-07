import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Nullable } from '../../models/nullable.model';
import { IAuthenticationBody } from './models/authentication-body.model';
import { IJwtPayload } from './models/jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser$: Observable<Nullable<IJwtPayload>>;

  private readonly _currentUser$ = new BehaviorSubject<Nullable<IJwtPayload>>(null);

  constructor(private readonly http: HttpClient) {
    this.currentUser$ = this._currentUser$.asObservable();
  }

  public login(body: IAuthenticationBody): Observable<IJwtPayload> {
    return this.http.post<IJwtPayload>('/api/auth/login', body);
  }
}
