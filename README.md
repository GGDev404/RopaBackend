<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 🛒 Ecommerce Backend (NestJS + PostgreSQL)

¡Bienvenido! Este proyecto es un backend robusto para un e-commerce de ropa, construido con **NestJS** y **PostgreSQL**. Incluye autenticación JWT, gestión de usuarios, productos con variantes, órdenes, carrito de compras y documentación Swagger lista para producción.

---

## 🚀 Requisitos
- Node.js >= 18
- npm >= 9
- Docker y Docker Compose (opcional, recomendado para base de datos local)

---

## ⚡ Instalación rápida

1. **Clona el repositorio:**
   ```sh
   git clone <url-del-repo>
   cd ecommerce-backend
   ```

2. **Instala dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto (ya incluido en este repo). Ejemplo:
   ```env
   JWT_SECRET=supersecretkey
   JWT_EXPIRES_IN=1d
   # Para base de datos local:
   # DB_HOST=localhost
   # DB_PORT=5432
   # DB_USERNAME=postgres
   # DB_PASSWORD=postgres
   # DB_DATABASE=ecommerce
   # Para base de datos en Render (usa solo una opción):
   DB_HOST=postgresql://usuario:contraseña@host:puerto/nombre_db
   DB_PORT=5432
   DB_USERNAME=usuario
   DB_PASSWORD=contraseña
   DB_DATABASE=nombre_db
   ```

4. **(Opcional) Levanta la base de datos local con Docker:**
   ```sh
   docker-compose up -d
   ```

5. **Inicia el servidor NestJS:**
   ```sh
   npm run start:dev
   ```

6. **Accede a la documentación Swagger:**
   - [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧩 Características principales
- 🔒 **Autenticación JWT** (registro, login, roles)
- 👤 **Gestión de usuarios** (admin y cliente)
- 👕 **CRUD de productos** (con variantes de color y talla, stock)
- 📦 **Órdenes y carrito de compras** (añadir, quitar, actualizar)
- 📄 **Documentación Swagger** para todos los endpoints
- ⚙️ **Variables de entorno** para fácil despliegue en Render, Railway, etc.
- 🐳 **Soporte para base de datos remota (Render) o local (Docker)**

---

## 📁 Estructura de carpetas
- `src/auth/` - Autenticación y guards
- `src/products/` - Controlador y servicio de productos
- `src/orders/` - Órdenes y carrito
- `src/entities/` - Entidades TypeORM
- `src/dto/` - DTOs de validación
- `src/users/` - Usuarios

---

## 📝 Ejemplos de uso

### 1. Registro de usuario
**POST** `/auth/register`
```json
{
  "email": "admin@email.com",
  "password": "123456",
  "role": "admin"
}
```

### 2. Login y obtención de token
**POST** `/auth/login`
```json
{
  "email": "admin@email.com",
  "password": "123456"
}
```
**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Crear producto (requiere token Bearer)
**POST** `/products`
```json
{
  "name": "Camiseta básica",
  "description": "Camiseta 100% algodón",
  "price": 299.99,
  "image": "https://ejemplo.com/camiseta.jpg",
  "category": "camisetas",
  "available": true,
  "stock": 50,
  "variants": [
    { "color": "rojo", "sizes": ["S", "M", "L"] },
    { "color": "azul", "sizes": ["M", "L"] }
  ]
}
```

### 4. Añadir producto al carrito
**POST** `/cart/add/1/2`  
(Agrega 2 unidades del producto con id 1 al carrito del usuario autenticado)

### 5. Crear una orden a partir del carrito
**POST** `/orders`
```json
{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

---

## 🛡️ Notas para producción
- Cambia `JWT_SECRET` por una clave segura y única.
- Usa `synchronize: false` en producción y migra con TypeORM.
- Configura correctamente el firewall de tu base de datos remota.
- Usa HTTPS en despliegues públicos.

---

## 🐞 Troubleshooting
- **Error de conexión a la base de datos:**
  - Verifica que los datos en `.env` sean correctos.
  - Si usas Render, asegúrate de que el campo `DB_HOST` sea la URL completa y que `ssl: { rejectUnauthorized: false }` esté en la config de TypeORM.
- **Error de stock o migraciones:**
  - Si cambias entidades, borra tablas o usa migraciones para evitar errores de columnas nulas.

---

## 📜 Licencia
MIT
