import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateRange } from '../../../core/models/movie-filters.interface';

@Component({
  selector: 'app-date-range-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.scss']
})
export class DateRangeFilterComponent {
  @Output() dateRangeChange = new EventEmitter<DateRange>();
  
  startDate: string = '';
  endDate: string = '';

  onDateChange(): void {
    this.dateRangeChange.emit({
      start: this.startDate || null,
      end: this.endDate || null
    });
  }

  clearDates(): void {
    this.startDate = '';
    this.endDate = '';
    this.dateRangeChange.emit({
      start: null,
      end: null
    });
  }

  get hasActiveDates(): boolean {
    return !!(this.startDate || this.endDate);
  }
}