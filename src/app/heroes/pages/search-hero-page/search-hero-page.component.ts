import { Component, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-hero-page',
  templateUrl: './search-hero-page.component.html',
  styleUrls: ['./search-hero-page.component.css']
})
export class SearchHeroPageComponent {
  searchInput = new FormControl('')
  heroes : Hero[] = []
  selectedHero?: Hero
  constructor(private heroService : HeroService, private router : Router) {}

  searchHero() { 
    const inputValue = this.searchInput.value || ''
    this.heroService.getSuggestions(inputValue)
      .subscribe(heroes => {
        console.log(this.searchInput.value , heroes)
        this.heroes = heroes
      })
  }

  onSelectedOption(event : MatAutocompleteSelectedEvent) { 
    const hero : Hero = event.option.value
    if(!hero) {
      this.selectedHero = undefined
      return 
    }
    //this.router.navigate(['heroes/', hero.id])
    this.searchInput.setValue( hero.superhero );
    this.selectedHero = hero
  }
}
