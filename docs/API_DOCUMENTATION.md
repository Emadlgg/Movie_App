# 📡 Documentación de API - MovieApp

## Información General

**API:** The Movie Database (TMDB) v3  
**Base URL:** `https://api.themoviedb.org/3`  
**Documentación:** [https://developer.themoviedb.org/docs](https://developer.themoviedb.org/docs)

---

## 🔐 Autenticación

### Tipo
Bearer Token Authentication (API Read Access Token v4)

### Configuración
```typescript
// src/environments/environment.ts
export const environment = {
  tmdbApiKey: 'eyJhbGci...', // Tu token aquí
  tmdbApiUrl: 'https://api.themoviedb.org/3'
};
```

### Headers
```http
Authorization: Bearer {API_READ_ACCESS_TOKEN}
Content-Type: application/json
```

**Implementación:** El token se inyecta automáticamente vía `authInterceptor`.

---

## 🌐 URLs de Imágenes
```
Base: https://image.tmdb.org/t/p/{size}/{path}
```

**Tamaños usados:**
- Posters: `w500`
- Backdrops: `w1280`
- Profiles: `w185`
- Logos: `w92`

---

## 🎯 Endpoints Utilizados

### 1. Películas en Cartelera
```http
GET /movie/now_playing?language=es-ES&page=1
```

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 12345,
      "title": "Título",
      "poster_path": "/path.jpg",
      "vote_average": 7.8,
      "release_date": "2025-11-01"
    }
  ],
  "total_pages": 50,
  "total_results": 1000
}
```

---

### 2. Películas Mejor Valoradas
```http
GET /movie/top_rated?language=es-ES&page=1
```

**Response:** Mismo formato que Now Playing

---

### 3. Detalle de Película
```http
GET /movie/{movie_id}?language=es-ES
```

**Response:**
```json
{
  "id": 12345,
  "title": "Título",
  "overview": "Descripción...",
  "runtime": 142,
  "budget": 200000000,
  "revenue": 500000000,
  "genres": [
    { "id": 28, "name": "Acción" }
  ],
  "production_companies": [...],
  "vote_average": 7.8
}
```

---

### 4. Créditos (Cast & Crew)
```http
GET /movie/{movie_id}/credits?language=es-ES
```

**Response:**
```json
{
  "id": 12345,
  "cast": [
    {
      "id": 500,
      "name": "Actor Name",
      "character": "Character",
      "profile_path": "/path.jpg",
      "order": 0
    }
  ],
  "crew": [
    {
      "id": 501,
      "name": "Director Name",
      "job": "Director",
      "department": "Directing"
    }
  ]
}
```

---

### 5. Películas Similares
```http
GET /movie/{movie_id}/similar?language=es-ES&page=1
```

**Response:** Lista de películas similar a Now Playing

---

### 6. Buscar Películas
```http
GET /search/movie?query=Avengers&language=es-ES&page=1
```

**Response:** Lista de películas

---

### 7. Votar Película
```http
POST /movie/{movie_id}/rating
Body: { "value": 8.5 }
```

**Response:**
```json
{
  "status_code": 1,
  "status_message": "Success."
}
```

⚠️ Requiere autenticación real de TMDB (Session ID)

---

## 📦 Modelos Principales

### Movie
```typescript
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}
```

### MovieDetail
```typescript
interface MovieDetail extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  tagline: string;
  status: string;
}
```

### Cast
```typescript
interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}
```

### Crew
```typescript
interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
}
```

---

## ⚠️ Códigos de Error

| Código | Descripción | Acción |
|--------|-------------|--------|
| 200 | OK | Exitoso |
| 400 | Bad Request | Parámetros inválidos |
| 401 | Unauthorized | Token inválido → Redirect a login |
| 404 | Not Found | Recurso no existe |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Server Error | Error del servidor |

**Manejo:** Implementado en `error.interceptor.ts`

---

## 🚦 Rate Limiting

- **Límite:** ~50 requests/segundo
- **Mitigación:**
  - Debounce en búsqueda (500ms)
  - Paginación
  - Lazy loading

---

## 💡 Ejemplos de Uso

### Obtener Películas
```typescript
this.movieService.getNowPlaying(1)
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next: (response) => this.movies = response.results,
    error: (error) => this.showError(error)
  });
```

### Buscar Películas
```typescript
this.movieService.searchMovies('Avengers', 1)
  .subscribe(response => {
    this.movies = response.results;
  });
```

### Detalle Completo
```typescript
forkJoin({
  movie: this.movieService.getMovieDetail(id),
  credits: this.movieService.getMovieCredits(id),
  similar: this.movieService.getSimilarMovies(id)
}).subscribe(response => {
  this.movie = response.movie;
  this.cast = response.credits.cast;
  this.similar = response.similar.results;
});
```

### URL de Imagen
```html
<img [src]="movie.poster_path | imageUrl:'poster'" [alt]="movie.title">
```

---

## 📝 Notas Importantes

### Idioma
La app usa `es-ES` (Español - España)

### Imágenes Faltantes
Si `poster_path: null`, se muestra placeholder: `assets/images/placeholder.png`

### Attribution
Según términos de uso:
```html
Powered by <a href="https://www.themoviedb.org/">TMDB</a>
```

---

## 📊 Resumen

| Endpoint | Método | Propósito |
|----------|--------|-----------|
| `/movie/now_playing` | GET | Películas en cartelera |
| `/movie/top_rated` | GET | Películas mejor valoradas |
| `/movie/{id}` | GET | Detalle de película |
| `/movie/{id}/credits` | GET | Reparto y crew |
| `/movie/{id}/similar` | GET | Similares |
| `/search/movie` | GET | Buscar |
| `/movie/{id}/rating` | POST | Votar |

---

**Versión API:** v3  
**Última actualización:** Noviembre 2025  
**Autor:** Osman De León