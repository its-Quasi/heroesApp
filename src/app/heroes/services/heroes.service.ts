import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private url = environments.baseUrl
  constructor(private http: HttpClient) { }

  // For Search Page - Component

  getSuggestions(query : string) : Observable<Hero[]> {
    const url = `${ this.url }/heroes?q=${ query }&_limit=6`
    console.log(url)
    return this.http.get<Hero[]>(url);
  }

  // CRUD Operations

  create(hero : Hero) : Observable<Hero> {
    hero.id = hero.superhero
    console.log('service' , hero)
    return this.http.post<Hero>(`${this.url}/heroes` , hero)
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes`)
  }
  
  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero | undefined>(`${this.url}/heroes/${id}`)
      .pipe(
        catchError(err => of(undefined))
      )
  }

  update(hero : Hero) : Observable<Hero> {
    if(!hero.id) throw Error('Hero dont found in database')
    return this.http.patch<Hero>(`${this.url}/heroes/${hero.id}`, hero)
  }

  deleteById(id : string) : Observable<boolean> { 
    return this.http.delete(`${this.url}/heroes/${id}`).pipe( 
      catchError( () => of(false) ), map( () => true ) 
    )
  }

}