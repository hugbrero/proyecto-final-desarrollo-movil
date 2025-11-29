# Proyecto Final — Desarrollo Móvil
### Aplicación Android (Java) + Backend Node.js ##

**Autor:** Hugo Breganza 
**Año:** 2025 
**Carnet:** 202301727 

---
## Descripción General del Proyecto

Este proyecto corresponde al entregable final del curso Desarrollo Móvil, e implementa una aplicación Android funcional conectada a un backend desarrollado en Node.js + Express.
La app permite:

- Registrar usuarios

- Iniciar sesión

- Visualizar perfil

- Capturar fotografía desde la cámara

- Seleccionar fotografía desde la galería

- Guardar la fotografía en el backend

- Mostrar la foto guardada en pantalla

- Mantener una sesión persistente

## El proyecto está dividido en dos componentes principales:

/proyectofinal
    /Backend    → API REST en Node.js
    /App        → Aplicación Android (Java)

## Arquitectura del Proyecto

La arquitectura propuesta sigue una estructura clara, separada por responsabilidades:

## Backend (Node.js)
Backend/
│   package.json
│   .env
│   README.md
│
├── controllers/
│       authController.js
│       profileController.js
│
├── routes/
│       authRoutes.js
│       profileRoutes.js
│
├── repositories/
│       userRepository.js
│
├── services/
│       userService.js
│
└── src/
        config/
            db.js
        index.js   ← punto de entrada (app.listen)

## Frontend (Android - Java)
App/
│
├── activities/
│       LoginActivity.java
│       RegisterActivity.java
│       ProfileActivity.java
│
├── fragments/
│       (si aplica)
│
├── models/
│       User.java
│
├── network/
│       ApiClient.java
│       ApiService.java
│
└── utils/
        SessionManager.java

## Funcionalidades Implementadas
✔ Registro de usuarios

Envia los datos al backend → se validan → se guarda el usuario.

✔ Inicio de sesión

### Autenticación mediante API.
Al iniciar sesión, se almacena el ID del usuario.

✔ Perfil de usuario

Muestra nombre

Muestra edad

Muestra correo

### Muestra fotografía del usuario (cargada desde backend)

✔ Captura de fotografía

Usamos:

MediaStore.ACTION_IMAGE_CAPTURE

✔ Seleccionar imagen de la galería

Usamos:

Intent.ACTION_PICK

✔ Subir imagen al backend

La imagen se convierte a Base64 y se envía al servidor.
##  Tecnologías utilizadas
Android

Java

Retrofit 2

Gson

FileProvider

Camera Intent

Glide (para mostrar imágenes)

## Backend

Node.js

Express

Multer (para manejo de imágenes)

dotenv

CORS

File System (para guardar imágenes)

JSON para almacenamiento simple

## Endpoints principales (Backend)
🔹 Registro
POST /api/auth/register

🔹 Inicio de sesión
POST /api/auth/login

🔹 Obtener perfil
GET /api/profile/:id

🔹 Guardar imagen de perfil
POST /api/profile/upload/:id

## Funcionalidad de Fotografía

Se implementan dos flows:

✔ Tomar fotografía
Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

✔ Seleccionar desde galería
Intent intent = new Intent(Intent.ACTION_PICK);
intent.setType("image/*");

✔ Guardado en backend

El backend recibe la imagen en Base64 y la guarda en:

Backend/uploads/


Luego devuelve la URL pública para mostrarla.

## Cómo ejecutar el proyecto
### Backend

Ubicarse en la carpeta:

cd Backend


Instalar dependencias:

npm install


Crear archivo .env:

PORT=3000
HOST=192.168.X.X (IP del backend visible por el teléfono)


### Ejecutar:

node src/index.js

Aplicación Android

Abrir la carpeta App/ en Android Studio

Modificar la IP en ApiClient.java:

public static final String BASE_URL = "http://192.168.X.X:3000/";


### Ejecutar en celular real o emulador.

Colaboradores

El repositorio incluye acceso para:

rarizandieta (según requerimiento del curso)

## Conclusiones

Se logró integrar correctamente un backend Node con la aplicación Android.

Se implementó captura, selección y subida de imágenes.

Se emplearon buenas prácticas de arquitectura tanto en backend como en frontend.

Se utilizó IP local, permitiendo comunicación entre dispositivos en la misma red.

Se cumple con todos los requisitos solicitados para el proyecto final.

### Licencia

Este proyecto es de uso académico para la Universidad.
Puede ser utilizado como referencia educativa.
