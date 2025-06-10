
import { RouterOutlet } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    window.onbeforeunload = () => {
      this.authService.logout();
    };
  }
  ngOnDestroy(): void {
    window.onbeforeunload = null;
  }

}
