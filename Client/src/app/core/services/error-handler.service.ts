import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ErrorHandlerService {
    handle(error: HttpErrorResponse): string{
        switch (error.status) {
            case 0:
                return 'Cannot connect to server';
            case 400:
                return error.error?.message ?? 'Validation error';
            case 401:
                return 'Invalid credentials';
            case 403:
                return 'Access denied';
            case 404:
                return 'Not found';
            case 500:
                return 'Server error — please try again later';
            default:
                return 'Something went wrong';
        }
    }
}