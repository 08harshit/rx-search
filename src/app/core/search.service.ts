import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, shareReplay, Subject, switchMap, map } from 'rxjs';

interface MovieResponse {
  results: any[];
  // Add other properties if needed
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchSubject = new Subject<string>();
  YOUR_API_KEY: string = '23fede1b4ae22730350dc7ed60906a31'

  constructor( private http: HttpClient) {
  }
  getSearchResults(): Observable<any> {
    return this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => query ? this.fetchResults(query) : of([])),
      shareReplay(1),
      catchError(error => {
        console.error('Search API Error:', error);
        return of([]);
      })
    );
  }

  fetchResults(query: string): Observable<any[]> {
    return this.http.get<MovieResponse>(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${this.YOUR_API_KEY}`
    ).pipe(
      map(response => response.results)
    );
  }

  search(query: string): void{
    console.log("🚀 ~ SearchService ~ search ~ query:", query)
    this.searchSubject.next(query);
  }
}
