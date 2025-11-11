# 🏗️ Arquitectura del Sistema - MovieApp

## Visión General

MovieApp implementa **Clean Architecture** con Angular 20, separando responsabilidades en capas bien definidas.
```
┌─────────────────────────────────────────┐
│   Presentation (Components, UI)         │
├─────────────────────────────────────────┤
│   Application (Services, State)         │
├─────────────────────────────────────────┤
│   Domain (Models, Interfaces)           │
├─────────────────────────────────────────┤
│   Infrastructure (HTTP, Guards, API)    │
└─────────────────────────────────────────┘
```

---

## 📦 Estructura de Módulos

### **Core Module** - Servicios Singleton
```
core/
├── guards/
│   └── auth.guard.ts              # Protección de rutas
├── interceptors/
│   ├── auth.interceptor.ts        # Inyección de token API
│   └── error.interceptor.ts       # Manejo global de errores
├── services/
│   ├── auth.service.ts            # Autenticación
│   ├── movie.service.ts           # Lógica de películas
│   ├── tmdb-api.service.ts        # Comunicación HTTP
│   └── notification.service.ts    # Notificaciones
├── models/                         # Interfaces TypeScript
└── validators/                     # Validadores personalizados
```

**Características:**
- ✅ Importado una sola vez
- ✅ Servicios singleton
- ✅ Sin componentes

### **Shared Module** - Componentes Reutilizables
```
shared/
├── components/
│   ├── movie-card/               # Tarjeta de película
│   ├── pagination/               # Paginación
│   ├── search-bar/               # Búsqueda
│   ├── date-range-filter/        # Filtro de fechas
│   ├── loader/                   # Spinner
│   ├── navbar/                   # Navegación
│   └── notification/             # Toasts
├── directives/
│   └── infinite-scroll.directive.ts
└── pipes/
    └── image-url.pipe.ts
```

**Características:**
- ✅ Exporta componentes/pipes/directivas
- ✅ Componentes "tontos" (presentacionales)
- ✅ Sin estado global

### **Feature Modules** - Lazy Loading
```
features/
├── auth/
│   └── pages/login/
├── movies/
│   ├── pages/
│   │   ├── now-playing/
│   │   ├── top-rated/
│   │   └── movie-detail/
│   └── components/
│       ├── cast-list/
│       ├── crew-list/
│       ├── related-movies/
│       └── vote-button/
└── layout/
    └── main-layout/
```

**Características:**
- ✅ Carga bajo demanda
- ✅ Rutas propias
- ✅ Componentes "inteligentes"

---

## 🔄 Flujo de Datos

### Request HTTP
```
Component
    ↓
Service (Lógica de negocio)
    ↓
TMDB API Service (HTTP)
    ↓
Auth Interceptor (Agrega token)
    ↓
HTTP Client → TMDB API
    ↓
Error Interceptor (Maneja errores)
    ↓
Observable → Component (Actualiza UI)
```

### Autenticación
```
1. Usuario → LoginComponent
2. AuthService.login() valida credenciales
3. Genera token → LocalStorage
4. Router redirige a /movies
5. AuthGuard permite acceso
```

---

## 🎯 Patrones de Diseño

| Patrón | Uso | Ejemplo |
|--------|-----|---------|
| **Dependency Injection** | Gestión de dependencias | `providedIn: 'root'` |
| **Facade** | Abstracción de API | `MovieService` |
| **Observer** | Programación reactiva | RxJS Observables |
| **Guard** | Protección de rutas | `authGuard` |
| **Interceptor** | Cross-cutting concerns | Token, Errores |

---

## 🧩 Tipos de Componentes

### Smart Components (Containers)
- Gestionan estado
- Interactúan con servicios
- Lógica de negocio

**Ejemplos:** `NowPlayingComponent`, `MovieDetailComponent`

### Dumb Components (Presentational)
- Solo presentan datos
- Reciben `@Input()`, emiten `@Output()`
- Sin dependencias de servicios

**Ejemplos:** `MovieCardComponent`, `PaginationComponent`

---

## 🔧 Servicios Principales

### TmdbApiService
```typescript
get<T>(endpoint: string, params?: any): Observable<T>
post<T>(endpoint: string, body: any): Observable<T>
```
**Responsabilidad:** Comunicación HTTP con TMDB

### MovieService
```typescript
getNowPlaying(page, filters): Observable<MoviesResponse>
getTopRated(page, filters): Observable<MoviesResponse>
getMovieDetail(id): Observable<MovieDetail>
getMovieCredits(id): Observable<MovieCredits>
getSimilarMovies(id): Observable<Movie[]>
```
**Responsabilidad:** Lógica de negocio de películas

### AuthService
```typescript
login(credentials): Observable<LoginResponse>
logout(): void
isAuthenticated(): boolean
getToken(): string | null
```
**Responsabilidad:** Autenticación y autorización

---

## 🛣️ Routing
```typescript
const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login') },
  { 
    path: 'movies', 
    loadChildren: () => import('./movies/movies.module'),
    canActivate: [authGuard] 
  },
  { path: '', redirectTo: '/movies/now-playing', pathMatch: 'full' }
];
```

**Características:**
- ✅ Lazy loading
- ✅ Route guards
- ✅ Rutas protegidas

---

## 📊 Gestión de Estado

### Estado Local (Componente)
```typescript
movies: Movie[] = [];
currentPage = 1;
isLoading = false;
```

### Estado Compartido (Servicio)
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;
}
```

### Persistencia
- **LocalStorage:** Token y usuario
- No usa cookies ni sessionStorage

---

## ⚠️ Manejo de Errores

### Tres Niveles

**1. Global - Error Interceptor**
```typescript
catchError((error: HttpErrorResponse) => {
  // Logging, notificaciones, redirects
})
```

**2. Servicio**
```typescript
catchError(error => {
  // Transformación, retry logic
  return throwError(() => error);
})
```

**3. Componente**
```typescript
error: (error) => {
  this.notificationService.showError(error.message);
}
```

---

## 🔒 Seguridad

- ✅ JWT Token Simulation (mock)
- ✅ LocalStorage para token
- ✅ Route Guards para protección
- ✅ Variables de entorno para API keys
- ✅ Sanitización automática de Angular
- ✅ HTTPS en producción

---

## ⚡ Optimizaciones

| Técnica | Implementación |
|---------|----------------|
| **Lazy Loading** | `loadChildren: () => import(...)` |
| **OnPush Detection** | `changeDetection: OnPush` |
| **TrackBy** | `trackBy: trackByMovieId` |
| **Image Lazy Loading** | `<img loading="lazy">` |
| **Debounce** | `debounceTime(500)` en búsqueda |
| **Tree Shaking** | Build automático de Angular |

---

## 🧪 Testing
```
├── Unit Tests (Jasmine)
│   ├── Servicios
│   ├── Componentes
│   └── Pipes
├── Integration Tests
│   └── Component + Service
└── E2E Tests (futuro)
    └── User flows
```

---

## 📈 Escalabilidad

### Preparado para:
- ✅ Nuevos features en `features/`
- ✅ Nuevos componentes en `shared/`
- ✅ State management (NgRx/Akita)
- ✅ Micro-frontends
- ✅ PWA capabilities
- ✅ SSR con Angular Universal
- ✅ i18n para múltiples idiomas

---

## 🎓 Principios SOLID

- **S** - Single Responsibility: Una responsabilidad por clase
- **O** - Open/Closed: Extensible sin modificar
- **L** - Liskov Substitution: Interfaces bien definidas
- **I** - Interface Segregation: Interfaces específicas
- **D** - Dependency Inversion: Inyección de dependencias

---

**Versión:** 1.0.0  
**Última actualización:** Noviembre 2025  
**Autor:** Osman De León