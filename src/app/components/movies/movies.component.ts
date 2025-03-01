import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, ScrollingModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent {
  @Input() movies: any[] = [];
  constructor(private cd: ChangeDetectorRef){}

  changeMovies() {
    console.log('changeMovies');
    this.cd.detectChanges();
    // this.cd.markForCheck();
  }


}
