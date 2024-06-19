import { Component } from '@angular/core';
import { AuthService } from "../../../Auth/auth.service";

@Component({
  selector: 'app-warehouse-dashboard',
  templateUrl: './warehouse-dashboard.component.html',
  styleUrl: './warehouse-dashboard.component.scss'
})
export class WarehouseDashboardComponent {

  constructor(private readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
