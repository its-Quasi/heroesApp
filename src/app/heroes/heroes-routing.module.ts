import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddHeroPageComponent } from './pages/add-hero-page/add-hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [
      { path : 'add', component : AddHeroPageComponent},
      { path : 'list', component : ListPageComponent },
      { path : '**', redirectTo : 'list' },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
