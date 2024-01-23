import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit {
  
  hero?: Hero
  constructor(private heroService: HeroService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe( switchMap(({ id }) => this.heroService.getHeroById(id)) )
      .subscribe(hero => {
        if (!hero) this.goBack()
        this.hero = hero
      })
  }
  goBack() {
    this.router.navigate(['/heroes/list'])
  }
}
