import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  sidebarItems = [
    {label : 'list', icon: 'list', url : 'list'},
    {label : 'add', icon: 'person_add', url : 'add'},
    {label : 'search', icon: 'search', url : 'search'}
  ]
}
