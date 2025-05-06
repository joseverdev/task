# Task

## 1. Clona el repositorio
Clona este repositorio en tu máquina local.

**HTTPS**  
```bash
git clone https://github.com/joseverdev/task.git
```

**SSH**  
```bash
git clone git@github.com:joseverdev/task.git
```


## 2. Instala las dependencias
Navega a los directorios correspondientes y ejecuta los siguientes comandos:

```bash
cd backend-node
npm install
```

```bash
cd frontend-next
npm install
```

## 3. Configura la base de datos
Crea una base de datos en tu máquina local con las credenciales necesarias. Utiliza el archivo `.env.example` ubicado en el directorio `backend-node` como referencia para configurar las variables de entorno requeridas:

```env
DB_PORT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
```

Renombra el archivo `.env.example` a `.env` y completa los valores según tu configuración.
## 4. Configura el JWT_SECRET
En el archivo `.env` del directorio `frontend-next`, asegúrate de utilizar exactamente el mismo valor de `JWT_SECRET` que configuraste en el archivo `.env` del directorio `backend-node`. Este valor puede ser cualquier cadena de texto que desees, desde una frase aleatoria hasta una clave generada específicamente para este propósito. La consistencia entre ambos archivos es esencial para garantizar el correcto funcionamiento de la autenticación.


## 5. Inicia los proyectos
Ejecuta los siguientes comandos para iniciar los proyectos en modo de desarrollo:

Para el backend:
```bash
cd backend-node
npm run dev
```

Para el frontend:
```bash
cd frontend-next
npm run dev
```