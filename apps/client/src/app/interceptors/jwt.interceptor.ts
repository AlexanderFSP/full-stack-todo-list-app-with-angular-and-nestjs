import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { AppRoutePath } from '../app.route-path';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private readonly tokenUpdated$ = new Subject<boolean>();

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const processedRequest = this.supplyJwtToRequest(request);

    return next.handle(processedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handleUnauthorizedError(request, next);
        }

        return throwError(error);
      })
    );
  }

  private supplyJwtToRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      return request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }

    return request;
  }

  private handleUnauthorizedError(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refresh().pipe(
        tap(result => {
          this.handleRefreshTokenResult(result);

          if (!result) {
            this.router.navigateByUrl(AppRoutePath.LOGIN);
          }
        }),
        filter(result => result),
        switchMap(() => next.handle(this.supplyJwtToRequest(request)))
      );
    }

    return this.tokenUpdated$.pipe(
      take(1),
      filter(result => result),
      switchMap(() => next.handle(this.supplyJwtToRequest(request)))
    );
  }

  private handleRefreshTokenResult(result: boolean): void {
    this.isRefreshing = false;
    this.tokenUpdated$.next(result);
  }
}
