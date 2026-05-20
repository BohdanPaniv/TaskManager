import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    goHome() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/boards']);
            return;
        }
        this.router.navigate(['/']);
    }
}