import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { map, Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatToolbarModule, MatButtonModule]
})
export class HeaderComponent implements OnInit {
  public isAuthenticated$!: Observable<boolean>;

  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this.authService.currentUser$.pipe(map(currentUser => !!currentUser));
  }

  public onSignOut(): void {
    this.authService.signOut();
  }
}
