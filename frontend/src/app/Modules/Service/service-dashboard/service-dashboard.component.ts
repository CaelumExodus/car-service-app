import { Component } from '@angular/core';
import { AuthService } from "../../../Auth/auth.service";

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrl: './service-dashboard.component.scss'
})
export class ServiceDashboardComponent {

  constructor(private readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
