# Tatoo Studio Backend

<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
  </ol>
</details>

# Objetivo

El departamento de producto nos ha encomendado desarrollar el backend correspondiente al sistema de gestión de citas para un estudio de tatuajes.

Para ello tendremos que crear una base de datos y conectar nuestra API a ella.

La API tendrá que tener los sigueintes endpoints minimos:

AUTH:

- Registro de usuario:
  - POST: /api/auth/register
- Inicio sesión:
  - POST: /api/auth/login

USERS:

- Ver todos los usuarios:
  - GET: /api/users (super_admin)
- Ver perfil de usuario:
  - GET: /api/users/profile
- Modificar datos de usuario:
  - PUT: /api/users/profile

APPOINTMENTS:

- Crear cita:
  - POST: /api/appointments
- Actualizar cita:
  - PUT: /api/appointments
- Recuperar cita por Id:
  - GET: /api/appointments/:id
- Ver mis propias citas:
  - GET: /api/appointments

SERVICES:

- Ver todos los servicios:
  - GET: /api/services

## Stack

Tecnologías utilizadas:

![MYSQL](./capturas/mysql-logo.svg){width=80} - ![EXPRESS](./capturas/express-109.svg){width=80} - ![TYPESCRIPT](./capturas/typescript.svg){width=40} - ![NODEJS](./capturas/nodejs.svg){width=80}

## Diagrama BD

!['imagen-db'](./capturas/Captura%20esquema%20BD.JPG)

## Instalación en local

1. Clonar el repositorio
   `git clone https://github.com/FernandoCatalaMunyoz/tatoo_backend.git`
2. `npm install`
3. Conectar repositorio con la base de datos usando el archivo `.env.sample` como plantilla
   ```
   PORT=
   #conexion a DB
   DB_USER=
   DB_PASSWORD=
   DB_PORT=
   DB_HOST=
   DB_DATABASE=
   ```
4. Añadimos los scripts al package.json de las migraciones y los seeders:

- `"run-migrations": "typeorm-ts-node-commonjs migration:run -d ./src/database/db.ts"`

- `"revert-migrations": "typeorm-ts-node-commonjs migration:revert -d ./src/database/db.ts"`

- `"seeder": "ts-node ./src/database/seeders/seeders.ts"`

- `"dev": "nodemon ./src/server.ts"`

5. Ejecutamos las migraciones:
   `npm run run-migrations`
6. Ejecutamos los seeders:
   `npm run seeder`
7. Arrancamos el servidor:
   `npm run dev`

## Usuarios y contraseñas:

Email y password de lso 3 usuarios básicos:

    - User (Role user):
        email: user@user.com
        password: 123456

    - Admin (Role admin):
        email: admin@admin.com
        password: 123456

    - Super_admin (Role super_admin):
        email: super_admin@super_admin.com
        password: 123456

## ENDPOINTS

### Register:

    url: POST localhost:4000/api/register
    Body:
    {
      "first_name":"Nombre del usuario",
        "last_name" : "Apellido del usuario",
        "email" : "email del usuario",
        "password" : "Contraseña"
    }

### Login:

     url: POST localhost:4000/api/login
     Body:
    {
        "email" : "email del usuario",
        "password" : "Contraseña"
    }

### Ver todos los usuarios(super_admin):

     url: GET localhost:4000/api/users
     Auth/Bearer:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM1LCJyb2xlTmFtZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNzA5NTgwMTYyLCJleHAiOjE3MTE0NTIxNjJ9.mk2x9ZUd-Q3gSK--X2oEf5TkuO2ajnLBplAiKHNlrig"

### Ver perfil de usuario:

     url: GET localhost:4000/api/profile
     Auth/Bearer:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMzLCJyb2xlTmFtZSI6InVzZXIiLCJpYXQiOjE3MDk1ODAyNjAsImV4cCI6MTcxMTQ1MjI2MH0.iAIxUOAKcjSmJmZ0hOg4QTMVwjYGjZA8_IyycJTq76g"

### Modificar perfil usuario:

     url: PUT localhost:4000/api/profile
     Auth:
      - Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMzLCJyb2xlTmFtZSI6InVzZXIiLCJpYXQiOjE3MDk1Nzg4OTMsImV4cCI6MTcxMTQ1MDg5M30.1YEEHjp5J3GgaVLliRBEJOCy4dyYKTNJ8WTI0o4xfjA"
     Body:
    {
        "dato a cambiar"(first_name,last_name,email): "dato a introducir"
    }

### Eliminar perfil usuario(super_admin):

     url: DELETE localhost:4000/api/users/:id
     Auth:
      - Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM1LCJyb2xlTmFtZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNzA5NTgwMTYyLCJleHAiOjE3MTE0NTIxNjJ9.mk2x9ZUd-Q3gSK--X2oEf5TkuO2ajnLBplAiKHNlrig"

### Ver todos los servicios:

    url: GET localhost:4000/api/services

### Crear servicio(super_admin):

    url: POST localhost:4000/api/services
     Auth:
       Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM1LCJyb2xlTmFtZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNzA5NTgwMTYyLCJleHAiOjE3MTE0NTIxNjJ9.mk2x9ZUd-Q3gSK--X2oEf5TkuO2ajnLBplAiKHNlrig"
     Body:
    {
        "services_name": "Nombre del servicio a crear"
    }

### Generar cita:

    url: POST localhost:4000/api/appointments
    Auth:(del usuario que quiere pedir una cita)
      - Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVOYW1lIjoidXNlciIsImlhdCI6MTcwOTU4MjY2OCwiZXhwIjoxNzExNDU0NjY4fQ.q0lqTiG7mNRSGTLBeclydT5pylVsnldk-6VcqDYg8Vk"
    Body:
    {
        "appointment_date": "MM/DD/YY hh:mm",
        "service_id: "id del servicio (1-5)"
    }

### Actualizar cita:

    url: PUT localhost:4000/api/appointments
    Auth:(del usuario que quiere actualizar una cita)
      - Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMzLCJyb2xlTmFtZSI6InVzZXIiLCJpYXQiOjE3MDk1NzMyMjksImV4cCI6MTcxMTQ0NTIyOX0.i92n1vEstGOt9K37X8-oJ_GtivBJ0yFjkNw_IIwWKl4"
    Body:
    {
        "appointmentId":"Id de la cita a cambiar",
        "appointmentDate": "Nueva fecha(MM/DD/AA hh:mm)"
    }

### Recuperar cita:

    url: GET localhost:4000/api/appointments/:id
      - Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMzLCJyb2xlTmFtZSI6InVzZXIiLCJpYXQiOjE3MDk1NzgzOTgsImV4cCI6MTcxMTQ1MDM5OH0.sA9fkoNp_AdCM5npU7Sv4o6V-DW9Jso9CfennkPFCQs"

### Recuperar citas del usuario loggeado:

    url: GET localhost:4000/api/appointments
    Auth:(del usuario que quiere consultar sus citas)
      - Bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMzLCJyb2xlTmFtZSI6InVzZXIiLCJpYXQiOjE3MDk1NzgzOTgsImV4cCI6MTcxMTQ1MDM5OH0.sA9fkoNp_AdCM5npU7Sv4o6V-DW9Jso9CfennkPFCQs"
