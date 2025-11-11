import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tmdbApiUrl = environment.tmdbApiUrl;

  if (req.url.startsWith(tmdbApiUrl)) {
    const clonedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${environment.tmdbApiKey}`,
        'Content-Type': 'application/json'
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};