const express = require('express')
const dotenv = require('dotenv')
const app = express()
const session = require('cookie-session')

app.locals.AppPath ='';

// Primero carga la configuración del archivo .env 
dotenv.config();
// Para colocar archivos en la carpeta publica 
app.use(express.static('wwwroot'));
// Se requiere para entender los datos recibidos en JSON 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Motor de plantillas
app.set('view engine', 'ejs')
// Autenticación por cookies
app.use(session({ name: ".frontendnode", secret: process.env.SECRET }))

// Middleware para variables hacia las vistas 
app.use(require('./middlewares/viewlocals.middleware'))

// Rutas
app.use("/", require('./controllers/HomeController.js'))
app.use("/home", require('./controllers/HomeController.js')) 
app.use("/auth", require('./controllers/authcontroller.js'))
app.use("/categorias", require('./controllers/categoriascontroller.js')) 
app.use("/peliculas", require('./controllers/PeliculasController.js')) 
app.use("/archivos", require('./controllers/archivos.controller.js'))
app.use("/bitacora", require('./controllers/bitacoracontroller.js')) 
app.use("/perfil", require('./controllers/PerfilController.js')) 
app.use("/usuarios", require('./controllers/UsuariosController.js'))
app.get('*', (req, res) => { res.status(484).send() })

// Middleware para el manejo de errores (Debe ser el último middleware a utilizar) 
const errorlogger = require('./middlewares/errorlogger.middleware')
const errorhandler = require('./middlewares/errorhandler.middleware') 
app.use(errorlogger, errorhandler)

// Inicia el servidor web en el puerto SERVER_PORT
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Aplicación de ejemplo escuchando en el puerto ${process.env.SERVER_PORT}`)
})