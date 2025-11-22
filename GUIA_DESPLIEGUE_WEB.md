# 📌 Guía Completa: Desplegar tu Portfolio en Internet

Esta guía te ayudará a publicar tu portfolio web profesional en Internet de forma **GRATUITA**.

---

## 🎯 Opciones de Hosting Recomendadas

Tu proyecto incluye:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express
- **Base de datos**: SQLite

Por lo tanto, necesitas un hosting que soporte aplicaciones **Full-Stack con Node.js**.

### ✅ Mejores Opciones (GRATIS):

1. **Render** ⭐ (Recomendado)
2. **Railway** 
3. **Fly.io**

---

## 🚀 OPCIÓN 1: Desplegar en Render (RECOMENDADO)

### ✨ Ventajas:
- ✅ Completamente GRATIS
- ✅ Fácil de usar
- ✅ Soporta Node.js y SQLite
- ✅ SSL (HTTPS) incluido
- ✅ Dominio gratis (.onrender.com)

### 📋 Pasos para Desplegar:

#### **PASO 1: Preparar tu proyecto**

1. Abre PowerShell en la carpeta de tu proyecto (`micv`)
2. Ejecuta los siguientes comandos:

```powershell
# Inicializar Git (si no lo has hecho)
git init
git add .
git commit -m "Proyecto portfolio listo para despliegue"
```

#### **PASO 2: Subir a GitHub**

1. Ve a [GitHub.com](https://github.com) e inicia sesión (o crea una cuenta)
2. Haz clic en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Configuración del repositorio:
   - **Repository name**: `mi-portfolio`
   - **Visibility**: Public
   - ❌ NO marques "Add a README file"
   - Haz clic en **"Create repository"**

4. Vuelve a PowerShell y ejecuta (reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub):

```powershell
git remote add origin https://github.com/TU-USUARIO/mi-portfolio.git
git branch -M main
git push -u origin main
```

#### **PASO 3: Crear cuenta en Render**

1. Ve a [Render.com](https://render.com)
2. Haz clic en **"Get Started for Free"**
3. Regístrate con tu cuenta de **GitHub** (esto facilita el proceso)

#### **PASO 4: Desplegar en Render**

1. En el Dashboard de Render, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub:
   - Busca y selecciona `mi-portfolio`
   - Haz clic en **"Connect"**

3. Configuración del servicio:
   - **Name**: `mi-portfolio` (o el nombre que prefieras)
   - **Region**: Selecciona la más cercana (ej: Oregon - US West)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Selecciona **"Free"**

4. **Variables de Entorno** (Environment Variables):
   - Haz clic en **"Advanced"**
   - Agrega las siguientes variables:
     ```
     NODE_ENV = production
     PORT = 10000
     ```

5. Haz clic en **"Create Web Service"**

#### **PASO 5: Esperar el despliegue**

- Render comenzará a construir y desplegar tu aplicación
- Este proceso puede tardar **5-10 minutos**
- Verás los logs en tiempo real
- Cuando veas **"Your service is live"**, ¡estará listo! 🎉

#### **PASO 6: Acceder a tu sitio web**

Tu sitio estará disponible en:
```
https://mi-portfolio.onrender.com
```

---

## 🚀 OPCIÓN 2: Desplegar en Railway

### ✨ Ventajas:
- ✅ Plan gratuito con $5 de crédito mensual
- ✅ Muy fácil de usar
- ✅ Soporta SQLite
- ✅ SSL incluido

### 📋 Pasos para Desplegar:

#### **PASO 1 y 2**: Igual que Render (preparar proyecto y subir a GitHub)

#### **PASO 3: Crear cuenta en Railway**

1. Ve a [Railway.app](https://railway.app)
2. Haz clic en **"Login"**
3. Inicia sesión con **GitHub**

#### **PASO 4: Desplegar**

1. En el Dashboard, haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Selecciona tu repositorio `mi-portfolio`
4. Railway detectará automáticamente que es un proyecto Node.js
5. Haz clic en **"Deploy Now"**

#### **PASO 5: Configurar variables**

1. Ve a la pestaña **"Variables"**
2. Agrega:
   ```
   NODE_ENV = production
   ```

#### **PASO 6: Obtener tu URL**

1. Ve a la pestaña **"Settings"**
2. En la sección **"Networking"**, haz clic en **"Generate Domain"**
3. Tu sitio estará disponible en una URL como:
   ```
   https://mi-portfolio-production.up.railway.app
   ```

---

## 🚀 OPCIÓN 3: Desplegar en Fly.io

### ✨ Ventajas:
- ✅ Generoso plan gratuito
- ✅ Excelente rendimiento
- ✅ Soporte para bases de datos

### 📋 Pasos para Desplegar:

#### **PASO 1: Instalar Fly CLI**

1. Abre PowerShell como **Administrador**
2. Ejecuta:
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

#### **PASO 2: Crear cuenta**

```powershell
fly auth signup
```

#### **PASO 3: Configurar tu aplicación**

1. En PowerShell, navega a la carpeta de tu proyecto
2. Ejecuta:
```powershell
fly launch
```

3. Sigue las instrucciones:
   - **App Name**: `mi-portfolio` (o deja que genere uno automático)
   - **Region**: Selecciona la más cercana
   - **PostgreSQL**: No (usarás SQLite)
   - **Redis**: No

#### **PASO 4: Desplegar**

```powershell
fly deploy
```

#### **PASO 5: Acceder a tu sitio**

```
https://mi-portfolio.fly.dev
```

---

## 🔧 Configuraciones Importantes ANTES de Desplegar

### 1️⃣ Crear un archivo `.gitignore`

Crea un archivo llamado `.gitignore` en la raíz de tu proyecto con este contenido:

```
node_modules/
.env
*.log
.DS_Store
database.sqlite
```

### 2️⃣ Verificar `package.json`

Asegúrate de que tu `package.json` tenga:

```json
{
  "name": "portfolio-micv",
  "version": "1.0.0",
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 3️⃣ Actualizar `server.js`

Asegúrate de que el puerto sea configurable:

```javascript
const PORT = process.env.PORT || 3000;
```

---

## 🎨 Personalizar tu Dominio (Opcional)

Si quieres un dominio personalizado como `www.tuportfolio.com`:

### Opción 1: Comprar un dominio
1. Compra un dominio en [Namecheap](https://www.namecheap.com) o [Google Domains](https://domains.google)
2. En Render/Railway/Fly.io, ve a configuración de dominios
3. Agrega tu dominio personalizado
4. Actualiza los registros DNS según las instrucciones

### Opción 2: Dominio gratuito
Usa servicios como [Freenom](https://www.freenom.com) o [.tk domains](https://www.dot.tk)

---

## 📊 Monitoreo y Mantenimiento

### Ver logs en Render:
1. Ve a tu servicio en Render
2. Haz clic en la pestaña **"Logs"**

### Ver logs en Railway:
1. Ve a tu proyecto
2. Haz clic en **"Deployments"**
3. Selecciona el deployment actual

### Actualizar tu sitio:
Cada vez que hagas cambios:

```powershell
git add .
git commit -m "Descripción de tus cambios"
git push origin main
```

El sitio se actualizará automáticamente en Render/Railway. 🚀

---

## ✅ Checklist Final

Antes de compartir tu portfolio, verifica:

- [ ] El sitio carga correctamente
- [ ] Todas las secciones funcionan
- [ ] Las imágenes se ven bien
- [ ] El formulario de contacto funciona
- [ ] La página se ve bien en móvil
- [ ] No hay errores en la consola del navegador (F12)

---

## 🆘 Solución de Problemas Comunes

### ❌ Error: "Cannot find module"
**Solución**: Asegúrate de que todas las dependencias estén en `package.json`

### ❌ Error: "Port already in use"
**Solución**: El hosting asignará el puerto automáticamente. Usa `process.env.PORT`

### ❌ La base de datos no guarda datos
**Solución**: SQLite puede tener problemas en algunos hostings. Considera migrar a PostgreSQL para producción.

### ❌ Las imágenes no cargan
**Solución**: Verifica que las rutas sean relativas y que las imágenes estén en la carpeta `public/`

---

## 📞 Recursos Adicionales

- **Documentación Render**: https://render.com/docs
- **Documentación Railway**: https://docs.railway.app
- **Documentación Fly.io**: https://fly.io/docs
- **GitHub Guides**: https://guides.github.com

---

## 🎉 ¡Felicidades!

Una vez desplegado tu portfolio, compártelo en:
- LinkedIn
- GitHub (en tu perfil)
- Tu CV
- Redes sociales

**Tu URL será algo como**:
- `https://mi-portfolio.onrender.com`
- `https://mi-portfolio.up.railway.app`
- `https://mi-portfolio.fly.dev`

---

📅 **Fecha de creación**: Noviembre 2025  
👤 **Autor**: Angie Daniela Bohórquez Escovar  
🚀 **Proyecto**: Portfolio Profesional
