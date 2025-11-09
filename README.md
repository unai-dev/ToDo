# 📝 To-Do API  
API RESTful para gestionar tareas (To-Do list) creada con **Node.js**, **Express** y **Firebase Firestore**.  
Permite **crear, leer, actualizar y eliminar** tareas de forma sencilla y profesional.

---

## ⚙️ Tecnologías principales

- **Node.js + Express** → Servidor backend  
- **Firebase Firestore** → Base de datos NoSQL  
- **Firebase Functions** → Despliegue serverless (opcional)  
- **CORS** + **dotenv** → Configuración y seguridad  
- **Postman / Thunder Client** → Pruebas de endpoints

---

## 🧱 Estructura del proyecto

```
functions/
├── app.js                 # Configuración principal de Express
├── index.js               # Exporta Express como función de Firebase
├── config/
│   └── firebase.js        # Inicialización del Admin SDK
├── routes/
│   └── taskRoutes.js      # Rutas (GET, POST, PATCH, DELETE)
├── controllers/
│   └── tasksController.js # Lógica de negocio CRUD
├── package.json
├── .gitignore
└── .env                   # Variables de entorno locales
```

---

## 🚀 Instalación local

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/todo-api.git
cd todo-api/functions
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar Firebase Admin SDK

Crea `functions/config/firebase.js`:

```js
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = { db };
```

Guarda tu **clave privada** (`serviceAccountKey.json`) en la carpeta `/functions/`.

> ⚠️ **No la subas a GitHub** — agrégala a tu `.gitignore`.

### 4️⃣ Ejecutar el servidor localmente

Inicia el backend:
```bash
node app.js
```

✅ La API estará en:  
http://localhost:3000/tasks

---

## 📘 Endpoints principales

| Método     | Ruta         | Descripción                   | Body (JSON)                                                         |
| ---------- | ------------ | ----------------------------- | ------------------------------------------------------------------- |
| **GET**    | `/tasks`     | Obtiene todas las tareas      | —                                                                   |
| **POST**   | `/tasks`     | Crea una nueva tarea          | `{ "title": "Aprender Express", "description": "Practicar rutas" }` |
| **PATCH**  | `/tasks/:id` | Actualiza una tarea existente | `{ "completed": true }`                                             |
| **DELETE** | `/tasks/:id` | Elimina una tarea por ID      | —                                                                   |

### 🔹 Ejemplo de respuesta (GET `/tasks`)

```json
{
  "message": "Tareas obtenidas correctamente",
  "tasks": [
    {
      "id": "AbC123xYz",
      "title": "Aprender Express",
      "description": "Practicar rutas y controladores",
      "completed": false,
      "createdAt": "2025-11-09T20:12:00.000Z"
    }
  ]
}
```

---

## 🔄 Deploy a Firebase Functions (opcional)

### 1️⃣ Inicializar Firebase
Desde la raíz del proyecto:
```bash
firebase init
```
Selecciona:
- ✅ Functions
- ❌ (Hosting no necesario)
- Lenguaje: **JavaScript**
- Linting: **No**
- Instalar dependencias: **Sí**

### 2️⃣ Desplegar
> ⚠️ Firebase requiere **plan Blaze (Pay-As-You-Go)** para habilitar `artifactregistry.googleapis.com`.  
> No cobra mientras estés en el uso gratuito.

```bash
firebase deploy --only functions
```

Si no quieres usar Blaze, puedes ejecutar tu API localmente o usar Render (ver abajo).

---

## 🌍 Deploy gratuito alternativo en Render

1. Crear cuenta en https://render.com  
2. Conectar tu repositorio GitHub  
3. Crear un nuevo **Web Service**

Configurar:
- Root Directory: `functions`
- Build Command: `npm install`
- Start Command: `node app.js`
- Environment Variables: tus claves de Firebase si las usas

Render te generará una URL tipo:
```
https://todo-api.onrender.com/tasks
```

---
---

## 🧠 Buenas prácticas incluidas

✅ Estructura modular (MVC básico)  
✅ Validaciones y manejo de errores  
✅ CORS habilitado  
✅ Código listo para Firebase Functions o cualquier servidor Node

---

## 🧰 Comandos útiles

| Comando                            | Descripción                          |
| ---------------------------------- | ------------------------------------ |
| `node app.js`                      | Ejecutar servidor local              |
| `npm run lint -- --fix`            | Corregir errores de formato          |
| `firebase emulators:start`         | Probar funciones Firebase localmente |
| `firebase deploy --only functions` | Desplegar a Firebase Cloud Functions |

---

## 💼 Autor

👨‍💻 **Unai Villar**   

---