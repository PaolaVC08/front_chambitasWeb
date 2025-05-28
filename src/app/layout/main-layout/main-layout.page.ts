import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.page.html',
  styleUrl: './main-layout.page.css'
})
export class MainLayoutPage {
  favoritos = Array(50).fill('Ander Luna');
}
