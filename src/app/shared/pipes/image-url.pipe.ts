import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  transform(path: string | null, size: 'poster' | 'backdrop' | 'profile' | 'logo' = 'poster'): string {
    if (!path) {
      return 'https://via.placeholder.com/500x750/1e293b/64748b?text=Sin+Imagen';
    }

    const sizeValue = environment.tmdbImageSizes[size];
    return `${environment.tmdbImageBaseUrl}/${sizeValue}${path}`;
  }
}