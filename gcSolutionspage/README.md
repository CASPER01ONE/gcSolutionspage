# GC Solutions Page — Guía de Despliegue

Esta guía documenta cómo desarrollar localmente y desplegar el frontend en GitHub Pages, además de preparar el backend y las variables de entorno necesarias.

## Desarrollo local

- Frontend
  - `cd frontend`
  - `npm install`
  - `npm run dev`
  - Abre `http://localhost:5173/`
  - El frontend usa `BrowserRouter` con `basename` y carga imágenes desde `public` respetando `BASE_URL`.

- Backend
  - `cd backend`
  - Crea `.env` basado en `backend/.env.example`
  - `npm install`
  - `npm run start`
  - Verifica `http://localhost:3000/` responda “Servidor OK”.

## Despliegue del Frontend en GitHub Pages

El repositorio contiene un workflow en `.github/workflows/deploy.yml` que:
- Instala dependencias y construye `frontend`.
- Publica el contenido de `frontend/dist` a GitHub Pages.
- Copia `index.html` a `404.html` para soportar rutas de SPA.

Pasos:
1. Crea el repositorio en GitHub y sube el proyecto (`branch main`).
2. En el repositorio, ve a `Settings → Pages` y selecciona “GitHub Actions” como fuente.
3. Configura la variable o secreto del repositorio `VITE_API_BASE`:
   - `Settings → Secrets and variables → Actions`
   - Puedes usar `Secrets` o `Variables` (el workflow acepta cualquiera):
     - Nombre: `VITE_API_BASE`
     - Valor: `https://<tu-backend-host>/api`
4. Haz `push` a `main` para disparar el workflow. La página quedará publicada en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

Notas:
- El `base` del build se configura con `VITE_BASE_PATH=/ <nombre-del-repo> /` automáticamente en el workflow.
- En desarrollo, las llamadas al backend usan `/api` vía el proxy de Vite (configurado en `vite.config.js`).

## Backend en producción

Debes alojarlo en un servicio (Render, Railway, Fly.io, etc.) y configurar:
- Variables en `.env`:
  - `PORT` (opcional, por defecto `3000`)
  - `MONGO_URI` (cadena de conexión a tu BD)
  - `JWT_SECRET` (un secreto robusto)
  - `CORS_ORIGIN` (origen permitido, por ejemplo `https://<tu-usuario>.github.io/<nombre-del-repo>`)
- CORS: ya está preparado en `server.js` para permitir `localhost` y el valor de `CORS_ORIGIN`.

## Variables de entorno

- Frontend (archivo de ejemplo: `frontend/.env.example`):
  - `VITE_API_BASE=/api` (desarrollo). En producción se toma del Workflow.

- Backend (archivo de ejemplo: `backend/.env.example`):
  - `PORT=3000`
  - `MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority`
  - `JWT_SECRET=tu-secreto-seguro`
  - `CORS_ORIGIN=https://<tu-usuario>.github.io/<nombre-del-repo>`

## Comprobaciones rápidas

- Frontend:
  - Rutas del SPA funcionan en GitHub Pages (gracias a `404.html`).
  - Assets cargan bajo la subruta del repo (`BASE_URL`).

- Backend:
  - `GET /api/home` responde JSON con mensaje y featured.
  - `GET /api/services` devuelve arreglo (puede ser vacío si la BD no está disponible).
  - `POST /api/quotes` recibe y guarda cotizaciones (requiere BD operativa).

## Problemas comunes

- “Invalid base URL” en desarrollo:
  - Usamos concatenación con `import.meta.env.BASE_URL` para assets en lugar de `new URL(...)`.
- 404 en rutas al refrescar en GitHub Pages:
  - Se solventa con `404.html` copiado desde `index.html` en el workflow.
- CORS bloquea peticiones desde Pages:
  - Configura `CORS_ORIGIN` en el backend con el origen de tu GitHub Pages.