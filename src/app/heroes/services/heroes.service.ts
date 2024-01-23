import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private url = environments.baseUrl
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes`)
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero | undefined>(`${this.url}/heroes/${id}`)
      .pipe(
        catchError(err => of(undefined))
      )
  }

  getSuggestions(query : string) : Observable<Hero[]> {
    const url = `${ this.url }/heroes?q=${ query }&_limit=6`
    console.log(url)
    return this.http.get<Hero[]>(url);
  }
}