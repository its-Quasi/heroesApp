import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddHeroPageComponent } from './pages/add-hero-page/add-hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchHeroPageComponent } from './pages/search-hero-page/search-hero-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path : '',
    component : LayoutPageComponent,
    children : [
      { path : 'add', component : AddHeroPageComponent},
      { path : 'list', component : ListPageComponent },
      {path : 'search' , component : SearchHeroPageComponent},
      {path : 'edit/:id' , component : AddHeroPageComponent},
      {path : ':id' , component : HeroPageComponent},
      { path : '**', redirectTo : 'list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
