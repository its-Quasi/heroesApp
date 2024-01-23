import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  heroes : Hero[] = []
  constructor(private heroService : HeroService) {}
  
  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }
}
