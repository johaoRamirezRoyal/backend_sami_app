import express from "express";
import cors from "cors";
//import dotenv from "dotenv";
import RouterUsuarios from "./routes/usuariosRutas.js";
import RouterPerfil from "./routes/perfilRutas.js";
import RouterAsistenciaEstudiantes from "./routes/asistenciaEstudiantesRutas.js";
//import { corsMiddleware } from "./middlewares/cors.js";

// Inicializamos el servidor Express
const app = express();

//Desabilitamos la información de hecho con Express
app.disable("x-powered-by");

// Configuramos las variables de entorno que se usaran en el servidor Express
//dotenv.config();

//Constante para el puerto del servidor
const PORT = process.env.PORT || 3000;

// Formatear la respuesta o requires de los formularios o inputs
app.use(express.json());

// Configuramos el servidor para usar CORS middleware
app.use(cors());

//Ruta de inicio (Prueba)
app.get("/", (req, res) => {
  res.send("SERVIDOR DEL COLEGIO REAL ROYAL SCHOOL 👑 🏫... CONEXIÓN ESTABLECIDA 💪");
});

//Rutas para los usuarios
app.use("/api/usuarios", RouterUsuarios);

//Rutas para los perfiles
app.use("/api/perfil", RouterPerfil);

//Rutas para las asistencias de estudiantes
app.use("/api/asistencias_estudiantes", RouterAsistenciaEstudiantes);


//app listen para levantar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});