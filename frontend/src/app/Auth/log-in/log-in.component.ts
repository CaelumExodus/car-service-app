import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(response => {
      this.authService.saveUserData(response.userId, response.userRole);
      this.router.navigate(['/home']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
