import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from "./components/search-bar-component/search-bar-component.component";
import { SearchService } from './core/search.service';
import { MoviesComponent } from './components/movies/movies.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBarComponent, MoviesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [SearchService]
})
export class AppComponent {
  movies: any;
  constructor(private searchService: SearchService) {

  }
  title = 'rx-search';

  handleSearch(query: string) {
    this.searchService.search(query);
    this.searchService.getSearchResults().subscribe(results => {
      this.movies= results
    }
    )
  }
}
