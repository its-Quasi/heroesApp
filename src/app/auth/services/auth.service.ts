import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user?: User;
  private url = environments.baseUrl

  constructor(private httpClient: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined
    return structuredClone(this.user)
  }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/users/1`).pipe(
      tap(user => {
        this.user = user
        localStorage.setItem('token', user.id.toString())
      })
    )
  }

  logout(): void {
    const savedOnLocal = localStorage.getItem('token')
    if (savedOnLocal) localStorage.removeItem('token')
  }

  checkAuthentication(): Observable<boolean> {
    const savedOnLocal = localStorage.getItem('token')
    if (!savedOnLocal) return of(false)
    return this.httpClient.get<User>(`${this.url}/users/1`).pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError(() => of(false))
    )
  }
}