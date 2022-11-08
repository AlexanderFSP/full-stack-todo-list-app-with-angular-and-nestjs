import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { AppRoutePath } from '../../app.route-path';
import { globalConfig } from '../../global-config';
import { Nullable } from '../../models/nullable.model';
import { IAuthenticationBody } from './models/authentication-body.model';
import { IJwtPayload } from './models/jwt-payload.model';
import { IRefreshBody } from './models/refresh-body.model';
import { ITokenPair } from './models/token-pair.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly currentUser$: Observable<Nullable<IJwtPayload>>;

  private readonly _currentUser$ = new BehaviorSubject<Nullable<IJwtPayload>>(null);

  constructor(private readonly router: Router, private readonly http: HttpClient) {
    this.currentUser$ = this._currentUser$.asObservable();
  }

  public signup(body: IAuthenticationBody): Observable<ITokenPair> {
    return this.http.post<ITokenPair>('/api/auth/signup', body);
  }

  public login(body: IAuthenticationBody): Observable<ITokenPair> {
    return this.http.post<ITokenPair>('/api/auth/login', body);
  }

  public refresh(): Observable<boolean> {
    const refreshToken = this.getRefreshToken();

    if (refreshToken) {
      const body: IRefreshBody = { refresh_token: refreshToken };

      return this.http.post<ITokenPair>('/api/auth/refresh', body).pipe(
        tap(tokenPair => this.proceedAuthentication(tokenPair)),
        map(() => true),
        catchError(() => {
          this.logoutCurrentUser();

          return of(false);
        })
      );
    }

    this.logoutCurrentUser();

    return of(false);
  }

  public proceedAuthentication(tokenPair: ITokenPair): void {
    this.storeTokens(tokenPair);
    this.setCurrentUser(jwt_decode(tokenPair.access_token));
  }

  public signOut(): void {
    this.logoutCurrentUser();
    this.router.navigateByUrl(AppRoutePath.LOGIN);
  }

  public resolveJwtPayloadViaAccessToken(): Nullable<IJwtPayload> {
    const accessToken = this.getAccessToken();

    if (accessToken) {
      try {
        const payload: IJwtPayload = jwt_decode(accessToken);
        const currTime = Date.now() / 1000;

        return payload.exp > currTime ? payload : null;
      } catch {} // eslint-disable-line no-empty
    }

    return null;
  }

  public setCurrentUser(payload: Nullable<IJwtPayload>): void {
    this._currentUser$.next(payload);
  }

  public getCurrentUserSnapshot(): Nullable<IJwtPayload> {
    return this._currentUser$.value;
  }

  public getAccessToken(): Nullable<string> {
    return localStorage.getItem(globalConfig.localStorageKeys.accessToken);
  }

  private getRefreshToken(): Nullable<string> {
    return localStorage.getItem(globalConfig.localStorageKeys.refreshToken);
  }

  private storeTokens(tokenPair: ITokenPair): void {
    const { accessToken, refreshToken } = globalConfig.localStorageKeys;

    localStorage.setItem(refreshToken, tokenPair.refresh_token);
    localStorage.setItem(accessToken, tokenPair.access_token);
  }

  private removeTokens(): void {
    const { accessToken, refreshToken } = globalConfig.localStorageKeys;

    localStorage.removeItem(refreshToken);
    localStorage.removeItem(accessToken);
  }

  private logoutCurrentUser(): void {
    this.removeTokens();
    this.setCurrentUser(null);
  }
}
