# CourtLab

Aplicación frontend desarrollada con Vite + React + JavaScript para la gestión de reservas de pistas de pádel.  
Permite consultar pistas disponibles para una fecha, seleccionar franjas horarias contiguas, añadir extras, calcular el precio en tiempo real y realizar reservas.  
Incluye además un panel de usuario con "Mis reservas" y un panel de administración básico.

---

## Características principales

- Visualización de todas las pistas disponibles para una fecha seleccionada.
- Información detallada de cada pista y sus franjas horarias disponibles.
- Selección de franjas contiguas con estados visuales (seleccionado, elegible, no elegible).
- Cálculo dinámico del precio según franjas y extras seleccionados.
- Proceso de reserva con modales de confirmación y éxito.
- Sección "Mis reservas" con listado y cancelación de reservas.
- Sistema de autenticación con contexto global.
- Rutas privadas y rutas de administrador.
- Panel de administración (frontend) para gestionar:
  - Pistas
  - Horarios
  - Extras
  - Roles

---

## Tecnologías utilizadas

- Vite
- React
- JavaScript
- React Router
- TailwindCSS
- Context API
- Fetch wrapper propio (services/api.js)

---

## Estructura del proyecto

src  
├── assets/
├── components/
│   ├── courts/
│   ├── modals/
│   ├── reservas/
│   └── ui/
│   └── PublicNavbar.jsx  
├── context/
│   ├── AuthContext.jsx
│   └── useAuth.js
├── layouts/
├── pages/
│   ├── admin/
│   ├── Dashboard.jsx  
│   ├── Landing.jsx  
│   ├── Login.jsx  
│   ├── MisReservas.jsx  
│   └── Register.jsx  
├── router/  
├── services/
├── App.css  
├── App.jsx  
├── index.css  
└── main.jsx

---

## Instalación y ejecución

1. Instalar dependencias:
   npm install

2. Ejecutar en modo desarrollo:
   npm run dev

3. Variables de entorno:
   El proyecto utiliza archivos .env.local y .env.production para configurar la URL de la API y otros parámetros necesarios.

---

## Estado del proyecto

CourtLab es un proyecto en desarrollo dentro de un entorno formativo.  
Las funcionalidades principales están implementadas y operativas.  
La API actual devuelve únicamente las franjas disponibles; futuras versiones permitirán mostrar todas las franjas y ampliar la lógica de selección.

---

## Licencia

Proyecto de uso educativo.
