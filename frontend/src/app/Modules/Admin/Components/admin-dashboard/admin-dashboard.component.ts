import { Component } from '@angular/core';
import { AuthService } from "../../../../Auth/auth.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  constructor(private readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
