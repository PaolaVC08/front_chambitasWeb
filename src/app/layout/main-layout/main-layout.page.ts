import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarPage } from '../../shared/pages/search-bar/search-bar.page';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, SearchBarPage, RouterModule],
  templateUrl: './main-layout.page.html',
  styleUrl: './main-layout.page.css'
})
export class MainLayoutPage {
  favoritos = Array(50).fill('Ander Luna');
}
