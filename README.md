# 🎬 MovieApp

Aplicación web desarrollada con **Angular 20** y **TailwindCSS** que consume la API de **TMDB** para explorar películas.

---

## 🛠️ Tecnologías

- **Angular 20.3** - Framework
- **TypeScript 5.9** - Lenguaje
- **TailwindCSS 3.4** - Estilos
- **RxJS 7.8** - Programación reactiva
- **TMDB API v3** - Datos de películas

---

## ✨ Características

### Funcionalidades
- ✅ Sistema de autenticación con login simulado
- ✅ Listado de películas en cartelera
- ✅ Listado de películas más populares
- ✅ Detalle completo de cada película
- ✅ Búsqueda de películas con debounce
- ✅ Filtros por rango de fechas
- ✅ Paginación y scroll infinito
- ✅ Reparto y equipo de producción
- ✅ Películas relacionadas
- ✅ Sistema de votación

### Técnicas
- ✅ Arquitectura modular (Core, Shared, Features)
- ✅ Lazy Loading de módulos
- ✅ Route Guards para protección
- ✅ HTTP Interceptors
- ✅ Componentes reutilizables
- ✅ Responsive design
- ✅ Manejo de errores centralizado

---

## 📦 Requisitos
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Angular CLI >= 20.0.0
```

---

## 🚀 Instalación

### 1. Clonar repositorio
```bash
git clone https://github.com/tu-usuario/PRUEBA_PAGALO_OSMAN_DE_LEON.git
cd PRUEBA_PAGALO_OSMAN_DE_LEON
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar API Key

**Obtener API Key:**
1. Regístrate en [TMDB](https://www.themoviedb.org/)
2. Ve a **Settings → API**
3. Solicita una API Key (Developer)
4. Copia el **API Read Access Token** (empieza con `eyJ...`)

**Configurar en el proyecto:**

Edita `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  tmdbApiKey: 'TU_API_READ_ACCESS_TOKEN_AQUI', // ← Pega aquí
  tmdbApiUrl: 'https://api.themoviedb.org/3',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p',
  tmdbImageSizes: {
    poster: 'w500',
    backdrop: 'w1280',
    profile: 'w185',
    logo: 'w92'
  }
};
```

### 4. Ejecutar aplicación
```bash
ng serve
```

Abre: **http://localhost:4200**

---

## 📁 Estructura del Proyecto
```
src/app/
├── core/                      # Servicios singleton, guards, interceptors
│   ├── guards/
│   ├── interceptors/
│   ├── services/
│   ├── models/
│   └── validators/
│
├── shared/                    # Componentes reutilizables
│   ├── components/
│   ├── directives/
│   └── pipes/
│
└── features/                  # Módulos por funcionalidad
    ├── auth/                  # Login
    ├── movies/                # Listados y detalle
    └── layout/                # Layout principal
```

---

## 🎮 Rutas

| Ruta | Descripción | Protegida |
|------|-------------|-----------|
| `/login` | Página de login | No |
| `/movies/now-playing` | Películas en cartelera | Sí |
| `/movies/top-rated` | Películas más populares | Sí |
| `/movies/detail/:id` | Detalle de película | Sí |

---

## 🔐 Credenciales de Prueba

| Usuario | Contraseña |
|---------|------------|
| `admin` | `admin123` |
| `demo` | `demo123` |

---

## 🧪 Testing

Los tests unitarios no fueron implementados ya que el enfoque de la prueba técnica está en:
- Funcionalidad completa
- Arquitectura del código
- Diseño de interfaz
- Consumo correcto de APIs

El proyecto está estructurado para facilitar la implementación de tests en el futuro usando Jasmine y Karma.

---

## 📦 Build de Producción
```bash
ng build --configuration production
```

Los archivos optimizados se generan en `dist/`.

---

## 🎨 Paleta de Colores

- **Negro** (`#09090b`) - Fondo principal
- **Rojo** (`#dc2626`) - Acciones y errores
- **Dorado** (`#fbbf24`) - Ratings y destacados
- **Verde** (`#22c55e`) - Éxito

---

## 📚 Documentación Adicional

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Arquitectura del sistema
- [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) - Endpoints de TMDB API

---

## 🐛 Solución de Problemas

**Error: API Key inválida**
- Usa el **API Read Access Token** (v4), no la API Key v3

**Colores no se aplican**
- Reinicia el servidor: `Ctrl + C` → `ng serve`
- Limpia caché: `Ctrl + Shift + R`

**Error: Cannot find module**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 👨‍💻 Autor

**Osman De León**
- Email: osmanemanuel2004@gmail.com
- GitHub: [@Emadlgg](https://github.com/Emadlgg)

---

## 🙏 Agradecimientos

- [TMDB](https://www.themoviedb.org/) - API de películas
- [Angular](https://angular.io/) - Framework
- [TailwindCSS](https://tailwindcss.com/) - Estilos
- **PAGALO** - Oportunidad de prueba técnica

---

<div align="center">

**Desarrollado con Angular 20 y Tailwind CSS**

*Noviembre 2025*

</div>
