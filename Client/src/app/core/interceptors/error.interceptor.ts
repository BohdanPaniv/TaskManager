import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from '@angular/core';
import { AuthService } from "@core/auth/auth.service";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                authService.logout();
            }

            return throwError(() => error);
        })
    );
}