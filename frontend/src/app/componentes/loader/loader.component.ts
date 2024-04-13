import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `
    <div class="loader-overlay">
      <div class="loader"></div>
    </div>
  `,
  styleUrl: './loader.component.css',
})
export class LoaderComponent {}
