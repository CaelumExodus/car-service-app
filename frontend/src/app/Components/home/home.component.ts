import { Component } from '@angular/core';
import { AuthService } from "../../Auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private readonly _authService: AuthService) { }

  logout(): void {
    this._authService.logout();
  }
}
