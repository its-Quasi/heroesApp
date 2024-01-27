import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  constructor(private authService: AuthService, private router: Router) { }
  sidebarItems = [
    { label: 'list', icon: 'list', url: 'list' },
    { label: 'add', icon: 'person_add', url: 'add' },
    { label: 'search', icon: 'search', url: 'search' }
  ]

  get user() : User | undefined {
    return this.authService.currentUser
  }

  onLogout(): void {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
