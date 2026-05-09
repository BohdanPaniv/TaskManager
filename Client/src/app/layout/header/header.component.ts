import { Component, inject } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);

  get userEmail() {
    const currentUser = this.authService.currentUser();
    return currentUser?.email ?? '';
  }

  logout() {
    this.authService.logout();
  }
}