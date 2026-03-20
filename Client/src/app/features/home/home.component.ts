import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   private router = inject(Router);

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}