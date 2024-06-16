import { Component } from '@angular/core';
import { AuthService } from "../../../Auth/auth.service";

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {

  constructor(private readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
