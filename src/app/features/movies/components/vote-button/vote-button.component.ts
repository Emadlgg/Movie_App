import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vote-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent {
  @Output() vote = new EventEmitter<number>();
  
  isOpen = false;
  selectedRating = 5;
  ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectRating(rating: number): void {
    this.selectedRating = rating;
  }

  submitVote(): void {
    this.vote.emit(this.selectedRating);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}