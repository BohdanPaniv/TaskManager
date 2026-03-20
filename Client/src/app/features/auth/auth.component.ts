import { Component, signal, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@core/auth/auth.service';
import { ErrorHandlerService } from '@core/services/error-handler.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private errorHandler = inject(ErrorHandlerService);

  activeTab = signal<'login' | 'register'>('login');
  isLoading = signal(false);
  errorMessage = signal('');

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tasks']);
      return;
    }

    const path = this.route.snapshot.url[0]?.path;
    if (path === 'register') {
      this.activeTab.set('register');
    }
  }

  setTab(tab: 'login' | 'register') {
    this.activeTab.set(tab);
    this.errorMessage.set('');
    this.router.navigate(['/auth', tab]);
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.isLoading.set(false),
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(this.errorHandler.handle(err));
        this.isLoading.set(false);
      }
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;
    
    const { password, confirmPassword } = this.registerForm.value;
    
    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.register(this.registerForm.value).subscribe({
      next: () => this.isLoading.set(false),
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(this.errorHandler.handle(err));
        this.isLoading.set(false);
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}