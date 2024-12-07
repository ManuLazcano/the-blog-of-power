# The Blog of Power

## Descripción
**The Blog of Power** es una plataforma diseñada para entusiastas del powerlifting, donde los usuarios pueden explorar noticias, campeonatos y récords de federaciones internacionales.

### Características principales:
- Registro y gestión de publicaciones.
- Distinción de roles: **administrador** y **usuario**.
- Asociaciones entre usuarios, publicaciones y federaciones.

## Tecnologías utilizadas
### Backend:
- Node.js
- Express
- Sequelize (ORM)
- SQLite

### Frontend:
- React
- Axios
- Vite.js
- TailwindCSS

### Otros:
- JWT para autenticación
- Bcrypt para encriptar contraseñas
- Zod para validación

## Instalación
### Requisitos previos:
- Node.js (v16 o superior)
- npm o yarn
- Git

### Pasos para clonar y ejecutar:

1. Clona el repositorio:
```bash
git clone https://github.com/ManuLazcano/the-blog-of-power.git
cd the-blog-of-power
```

2. Instala las dependencias del backend y frontend:
```bash
cd backend
npm install
cd ../frontend
npm install
```

3. Crea un archivo .env en el **frontend** con las siguientes variables:
```bash
VITE_API_BASE_URL = http://localhost:3000/api
```

4. Crea un archivo .env en el **backend** con las siguientes variables:
 ```bash
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
SECRET_JWT_KEY=texto-muy-largo-y-seguro
SALT_ROUNDS=10
 ADMIN_NICKNAME=admin
 ADMIN_NAME=Admin User
 ADMIN_EMAIL=admin@example.com
 ADMIN_PASSWORD=secureadminpassword123
   ```
>[!NOTE]
>Personaliza la información del administrador y usa una secret key compleja

5. Inicia el servidor backend:
```bash
npm run start
```

6. Inicia el servidor frontend:
```bash
cd ../frontend
npm run dev
```

7. Abre tu navegador en la URL que indique Vite para el frontend.


## Estructura del proyecto
```bash
the-blog-of-power/
├── backend/         # Lógica y API del servidor
│   ├── controllers/         # Controladores para manejar las solicitudes (user, publication)
│   ├── database/            # Configuración y scripts relacionados con la base de datos
│   │   ├── config.js        # Configuración de la base de datos
│   │   └── populateDatabase.js # Inicialización de datos en la base de datos
│   ├── middlewares/         # Middlewares personalizados
│   │   ├── authenticateToken.js        # Middleware para rutas protegidas
│   │   └── optionalAuthenticateToken.js # Middleware para rutas opcionalmente protegidas
│   ├── models/              # Modelos de Sequelize (user, publication)
│   ├── routes/              # Endpoints (user, publication)
│   ├── schemas/             # Validaciones con Zod (user, publication)
│   └── app.js               # Archivo principal del servidor
├── frontend/        # Aplicación de React
│   ├── public/               # Archivos públicos (favicon, etc.)
│   │   └── favicon.ico       # Ícono de la página
│   ├── src/                  # Código fuente del frontend
│   │   ├── api/              # Configuración para las llamadas a la API
│   │   │   ├── apiClient.js  # Cliente base para Axios
│   │   │   ├── publicationApi.js # Servicios relacionados con publicaciones
│   │   │   └── userApi.js    # Servicios relacionados con usuarios
│   │   ├── components/       # Componentes reutilizables
│   │   ├── context/          # Contexto de React (estado global)
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Vistas principales (Home, Login, etc.)
│   │   ├── schemas/          # Validaciones con Zod (user, publication)
│   │   ├── app.jsx           # Componente principal
│   │   └── main.jsx          # Punto de entrada de la aplicación
│   └── index.html            # Documento HTML principal
└── README.md        # Documentación del proyecto
```
