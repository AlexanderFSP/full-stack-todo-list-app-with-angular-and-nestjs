import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

import { globalConfig } from '../../global-config';
import { Nullable } from '../../models/nullable.model';
import { IAuthenticationBody } from './models/authentication-body.model';
import { IJwtPayload } from './models/jwt-payload.model';
import { ITokenPair } from './models/token-pair.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser$: Observable<Nullable<IJwtPayload>>;

  private readonly _currentUser$ = new BehaviorSubject<Nullable<IJwtPayload>>(null);

  constructor(private readonly http: HttpClient) {
    this.currentUser$ = this._currentUser$.asObservable();
  }

  public signup(body: IAuthenticationBody): Observable<ITokenPair> {
    return this.http.post<ITokenPair>('/api/auth/signup', body);
  }

  public login(body: IAuthenticationBody): Observable<ITokenPair> {
    return this.http.post<ITokenPair>('/api/auth/login', body);
  }

  public proceedAuthentication(tokenPair: ITokenPair): void {
    this.storeTokens(tokenPair);
    this._currentUser$.next(jwt_decode(tokenPair.access_token));
  }

  private storeTokens(tokenPair: ITokenPair): void {
    const { accessToken, refreshToken } = globalConfig.localStorageKeys;

    localStorage.setItem(refreshToken, tokenPair.refresh_token);
    localStorage.setItem(accessToken, tokenPair.access_token);
  }
}
