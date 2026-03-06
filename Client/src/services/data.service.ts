import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private http = inject(HttpClient);
  private apiUrl = '/api/items';

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
}