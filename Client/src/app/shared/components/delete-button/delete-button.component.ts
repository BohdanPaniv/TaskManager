import { Component, output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss'
})
export class DeleteButtonComponent  {
  clicked = output<Event>();
}