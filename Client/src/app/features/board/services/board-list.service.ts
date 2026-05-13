import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@env/environment";
import { CreateListRequest, ListItem } from '@core/models/board-list.model';
import { ApiResponse } from "@core/models/api-response.model";
import { catchError, tap } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({ providedIn: "root"})
export class BoardListService {
  private http = inject(HttpClient);
  private readonly API = `${environment.apiUrl}/api/lists`;
  
  lists = signal<ListItem[]>([]);
  isLoading = signal(false);
  isSubmitting = signal(false);

  create(request: CreateListRequest) {
      return this.http.post<ApiResponse<ListItem>>(this.API, request).pipe(
          tap(response => {
              this.lists.update(lists => [...lists, response.data]);
              this.isSubmitting.set(false);
          }),
          catchError(err => {
              this.isSubmitting.set(false);
              return throwError(() => err);
          })
      );
  }
}