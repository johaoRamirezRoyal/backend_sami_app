import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import RouterUsuarios from "./routes/usuariosRutas.js";

// Inicializamos el servidor Express
const app = express();

// Configuramos las variables de entorno que se usaran en el servidor Express
dotenv.config();

//Constante para el puerto del servidor
const PORT = process.env.PORT || 3000;

// Formatear la respuesta o requires de los formularios o inputs
app.use(express.json());

// Configuramos el servidor para usar CORS middleware
app.use(cors());

//Ruta de inicio (Prueba)
app.get("/", (req, res) => {
  res.send("Hello Hola mundo español!");
});


app.use("/api/usuarios", RouterUsuarios);



//app listen para levantar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});