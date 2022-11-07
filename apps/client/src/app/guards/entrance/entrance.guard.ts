import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { AppRoutePath } from '../../app.route-path';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntranceGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  private get tasksUrlTree(): UrlTree {
    return this.router.parseUrl(`/${AppRoutePath.TASKS}`);
  }

  public canActivate(): Observable<boolean | UrlTree> {
    const currentUser = this.authService.getCurrentUserSnapshot();

    if (currentUser) {
      return of(this.tasksUrlTree);
    }

    const payload = this.authService.resolveJwtPayloadViaAccessToken();

    if (payload) {
      this.authService.setCurrentUser(payload);

      return of(this.tasksUrlTree);
    }

    return this.authService.refresh().pipe(switchMap(value => of(value ? this.tasksUrlTree : true)));
  }
}
