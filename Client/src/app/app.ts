import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {

  title = signal('Client');
  items = signal<Item[]>([]);

  private dataService = inject(DataService);

  constructor() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems().subscribe(data => {
      this.items.set(data);
    });
  }
}
