import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { throwError } from 'rxjs';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() hero!: Hero;
  
  ngOnInit(): void {
    if(!this.hero) throw Error('hero is required')
  }

}
