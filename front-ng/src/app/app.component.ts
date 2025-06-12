import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'front-ng';
  constructor(private authService: AuthService) {}

ngOnInit() {
  this.authService.getCurrentUser().subscribe({
    next: (user) => console.log('Connecté:', user),
    error: () => console.log('Utilisateur non connecté')
  });
}

}
