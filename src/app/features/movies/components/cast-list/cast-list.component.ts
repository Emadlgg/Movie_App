import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cast } from '../../../../core/models/cast.interface';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url.pipe';

@Component({
  selector: 'app-cast-list',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent {
  @Input() cast: Cast[] = [];

  get displayedCast(): Cast[] {
    return this.cast.slice(0, 12);
  }
}