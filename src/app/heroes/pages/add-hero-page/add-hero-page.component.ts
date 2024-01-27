import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from '../../services/heroes.service';
import { delay, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDailogComponent } from '../../components/confirm-dailog/confirm-dailog.component';

@Component({
  selector: 'app-add-hero-page',
  templateUrl: './add-hero-page.component.html',
  styleUrls: ['./add-hero-page.component.css']
})
export class AddHeroPageComponent implements OnInit {

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  get hero(): Hero {
    const hero = this.heroForm.value as Hero
    return hero
  }

  ngOnInit(): void {
    this.getParams()
  }

  heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl('', { nonNullable: true }),
    first_appearance: new FormControl<string>(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];


  getParams(): void {
    
    if(!this.router.url.includes('edit')) return ;

    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.heroService.getHeroById(id))
    )
    .subscribe(hero => {
      if (!hero) return;
      this.heroForm.reset(hero)
    })
  }

  onSubmit() : void {
    if(this.heroForm.invalid) {
      return;
    }
    if(!this.hero.id) {
      this.heroService.create(this.hero).subscribe( hero => {
        this.router.navigate(['/heroes/list'])
        this.showSnackBar(`el heroe ${hero.superhero} fue creado`)
      })
      return
    }

    this.heroService.update(this.hero).subscribe( hero => {
      this.showSnackBar(`el heroe ${hero.superhero} fue actualizado`)
    })
  }

  onDelete() { 
    const dialogRef = this.dialog.open(ConfirmDailogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(confirm => {

      if(!confirm) return
      
      this.heroService.deleteById(this.hero.id).subscribe(() => {
        this.showSnackBar(`El heroe ${this.hero.superhero} fue eliminado`)
        this.router.navigate(['/heroes/list'])
      })
    });
  }

  showSnackBar(msg : string) { 
    this.snackBar.open(msg , 'done' , {
      duration : 2500
    })
  } 
}
