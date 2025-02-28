import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from "./components/search-bar-component/search-bar-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBarComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rx-search';
}
