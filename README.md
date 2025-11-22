# Portfolio MiCV - Página de Presentación Profesional

Página web de presentación profesional para ingeniera junior de desarrollo, con arquitectura escalable que incluye frontend moderno con Bootstrap 5, backend con Node.js/Express, base de datos MySQL, y panel de administrador completo.

## 🚀 Características

- ✨ Diseño moderno y responsive con Bootstrap 5
- 🎨 Efectos glassmorphism y gradientes personalizados
- 🌓 Tema claro/oscuro
- 🔐 Panel de administrador con autenticación JWT
- 💾 Base de datos MySQL con Sequelize ORM
- 📱 Completamente responsive
- 🔄 API REST completa
- ⚡ Arquitectura escalable

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MySQL (v5.7 o superior)
- npm o yarn

## 🛠️ Instalación

1. **Clonar o navegar al directorio del proyecto**
   ```bash
   cd "c:\Users\USUARIO\Documents\pruebas py\micv"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar MySQL**
   - Asegúrate de que MySQL esté instalado y en ejecución
   - Crea la base de datos:
     ```sql
     CREATE DATABASE portfolio_db;
     ```

4. **Configurar variables de entorno**
   - Copia el archivo `.env.example` a `.env`
   - Edita el archivo `.env` con tus credenciales de MySQL:
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=portfolio_db
     DB_USER=root
     DB_PASSWORD=tu_contraseña_mysql
     JWT_SECRET=cambia_esto_por_un_secreto_seguro
     ```

5. **Inicializar la base de datos**
   ```bash
   npm run seed
   ```
   Este comando creará las tablas y datos de ejemplo. **Guarda las credenciales de administrador que se muestran en la consola.**

## 🚀 Uso

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 🔑 Acceso de Administrador

- **URL**: http://localhost:3000/admin
- **Usuario**: admin (por defecto)
- **Contraseña**: Admin123! (por defecto)

⚠️ **IMPORTANTE**: Cambia la contraseña después del primer acceso.

## 📁 Estructura del Proyecto

```
micv/
├── config/           # Configuración de base de datos
├── middleware/       # Middleware de autenticación
├── models/          # Modelos Sequelize
├── public/          # Archivos estáticos
│   ├── admin/       # Panel de administrador
│   ├── index.html   # Página principal
│   ├── styles.css   # Estilos personalizados
│   └── script.js    # JavaScript principal
├── routes/          # Rutas de API
├── scripts/         # Scripts de utilidad
├── server.js        # Servidor Express
└── package.json     # Dependencias
```

## 📚 Documentación Completa

Para documentación detallada sobre arquitectura, API, base de datos y más, consulta:
- [documentacion_total.md](./documentacion_total.md)

## 🛡️ Seguridad

- Autenticación JWT
- Contraseñas hasheadas con bcrypt
- Helmet.js para seguridad HTTP
- CORS configurado
- Validación de datos

## 🌐 API Endpoints

### Públicos
- `GET /api/projects` - Listar proyectos
- `GET /api/skills` - Listar habilidades
- `GET /api/experience` - Listar experiencia
- `POST /api/contact` - Enviar mensaje

### Protegidos (requieren autenticación)
- `POST /api/auth/login` - Autenticación
- `POST /api/projects` - Crear proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto
- (Similar para skills, experience, contact)

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor con nodemon (desarrollo)
- `npm run seed` - Inicializa la base de datos con datos de ejemplo

## 📄 Licencia

ISC

## 👤 Autor

Ingeniera Jr de Desarrollo

---

Para más información, consulta la [documentación completa](./documentacion_total.md).
