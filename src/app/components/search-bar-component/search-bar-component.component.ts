import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar-component.component.html',
  styleUrls: ['./search-bar-component.component.scss'],
  imports: [ReactiveFormsModule]

})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchControl = new FormControl(''); // Form control for input
  @Output() searchQuery = new EventEmitter<string>(); // Emit search term
  private destroy$ = new Subject<void>(); // Cleanup stream

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms before emitting
        takeUntil(this.destroy$) // Auto-unsubscribe on destroy
      )
      .subscribe(query => this.searchQuery.emit(query ?? ''));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
