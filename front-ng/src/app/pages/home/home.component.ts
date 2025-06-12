import { Component , inject} from '@angular/core';
import { LogoutService } from '../../services/logout/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  private logoutService = inject(LogoutService);
  private router = inject(Router);


  logout() {
    this.logoutService.logout();
    this.router.navigate(['/login']); // ou ta route de connexion
  }
}
