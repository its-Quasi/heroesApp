import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) { }
  user?: User;
  onLogin() {
    this.authService.login('', '').subscribe(
      user => {
        console.log(user)
        this.user = user
        this.router.navigate(['/'])
      }
    )
  }
}
