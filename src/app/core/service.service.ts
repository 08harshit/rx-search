import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  searchSubject = new Subject<string>();
  YOUR_API_KEY: string = '23fede1b4ae22730350dc7ed60906a31'

  constructor( private http: HttpClient) {
  }
  getSearchResults(): Observable<any> {
    return this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => query ? this.fetchResults(query) : of([])),
      catchError(error => {
        console.error('Search API Error:', error);
        return of([]);
      })
    );
  }

  fetchResults(query: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query={${query}}&api_key=${this.YOUR_API_KEY}`)
  }

  search(query: string): void{
    this.searchSubject.next(query);
  }
}
