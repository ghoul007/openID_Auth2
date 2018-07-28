import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  isAdmin() {
    // return this._authService.authContext && this._authService.authContext.claims && (this._authService.authContext.claims.find(c => c.type === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' && c.value === 'Admin'));
  }
}
