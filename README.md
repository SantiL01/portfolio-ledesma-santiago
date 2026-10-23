# Portfolio Web - Santiago Ledesma

## Descripción
Portfolio personal desarrollado como actividad integradora de Programación Web.

- **Primera etapa (Unidad 3):** sitio estático con HTML, CSS y JavaScript.
- **Segunda etapa (Unidades 3 a 6):** la sección de proyectos pasa a obtener la información desde una base de datos MySQL, a través de un backend hecho con Node.js, Express y TypeScript. Incluye un CRUD completo de proyectos.

## Tecnologías utilizadas

**Frontend**
- HTML5 (etiquetas semánticas)
- CSS3 (Flexbox, Grid, variables, media queries, animaciones)
- JavaScript (DOM, eventos, `fetch`)

**Backend**
- Node.js
- Express
- TypeScript
- MySQL (con la librería `mysql2`)
- dotenv (variables de entorno)

**Herramientas**
- Git y GitHub
- REST Client (extensión de VS Code para probar los endpoints)

## Funcionalidades
- Modo claro/oscuro con interruptor animado
- Foto de perfil con efecto flip que lleva a mi GitHub
- Formulario de contacto con validación y contador de caracteres
- **Proyectos cargados desde la base de datos**: solo se muestran los que están en estado `publicado`
- **Panel de administración** para crear, editar y eliminar proyectos (CRUD)
- Validación de datos en el servidor, con mensajes de error en la página

## Estructura del proyecto

```
portfolio-ledesma-santiago/
├── frontend/
│   ├── index.html
│   ├── CSS/style.css
│   ├── JS/script.js
│   └── img/
├── backend/
│   ├── db/schema.sql          # crea la base de datos y la tabla
│   ├── src/
│   │   ├── index.ts           # servidor Express
│   │   ├── db.ts              # conexión a MySQL
│   │   ├── routes/proyectos.ts  # endpoints del CRUD
│   │   └── types/proyecto.ts  # interfaz Proyecto (TypeScript)
│   ├── pruebas.http           # pedidos de prueba para REST Client
│   ├── .env.example           # modelo de variables de entorno
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## Requisitos
- [Node.js](https://nodejs.org) (versión LTS)
- MySQL Server (y opcionalmente MySQL Workbench)

## Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/SantiL01/portfolio-ledesma-santiago.git
cd portfolio-ledesma-santiago
```

### 2. Crear la base de datos
Abrir `backend/db/schema.sql` en MySQL Workbench (conectado al servidor local) y ejecutarlo completo.
Esto crea la base `portfolio`, la tabla `proyectos` y carga tres proyectos de ejemplo.

### 3. Configurar la conexión
Dentro de `backend/`, copiar `.env.example` con el nombre `.env` y completar los datos de MySQL:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=portfolio
```

> El archivo `.env` contiene la contraseña, por eso está en `.gitignore` y no se sube al repositorio.

### 4. Instalar las dependencias
```bash
cd backend
npm install
```

### 5. Ejecutar
```bash
npm run dev
```

Abrir **http://localhost:3000** en el navegador. El mismo servidor entrega el frontend y la API.

Otros comandos:
- `npm run build`: compila TypeScript a JavaScript en `backend/dist/`
- `npm start`: ejecuta la versión compilada

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/proyectos` | Lista todos los proyectos |
| GET | `/api/proyectos/:id` | Devuelve un proyecto |
| POST | `/api/proyectos` | Crea un proyecto |
| PUT | `/api/proyectos/:id` | Modifica un proyecto |
| DELETE | `/api/proyectos/:id` | Elimina un proyecto |

Ejemplo de body para POST y PUT:
```json
{
  "nombre": "Portfolio Web",
  "descripcion": "Mi portfolio personal con backend en Node.js y Express",
  "tecnologias": "HTML, CSS, JavaScript, Node.js, Express, TypeScript, MySQL",
  "imagen": "img/captura.png",
  "enlace": "https://github.com/SantiL01/portfolio-ledesma-santiago",
  "estado": "publicado"
}
```
`nombre`, `descripcion` y `tecnologias` son obligatorios. `estado` puede ser `publicado` o `borrador`.

## Decisiones técnicas
- **Base de datos relacional (MySQL):** todos los proyectos tienen los mismos campos, por lo que una tabla con estructura fija es la opción natural. MySQL además valida los datos (`NOT NULL`, `ENUM`).
- **TypeScript:** se usa en el backend para definir la interfaz `Proyecto` y el tipo unión `EstadoProyecto`, lo que permite detectar errores de tipos antes de ejecutar el código.
- **Seguridad:** las consultas SQL usan parámetros (`?`) para evitar inyección SQL, y el frontend escapa el texto antes de mostrarlo para evitar XSS.

## Autor
Santiago Ledesma — [GitHub](https://github.com/SantiL01)
