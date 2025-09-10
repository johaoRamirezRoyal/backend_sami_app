import { Router } from "express";
import PerfilControl from "../controllers/perfilControl.js";


/**
 *  Para acceder a las rutas de los perfiles es la siguiente dirección url: http://localhost:3000/api/perfil
 */


const perfilControl = new PerfilControl(); // 👈 crea la instancia (singleton ya se encarga de no duplicar)
const RouterPerfil = Router();

// Ruta para obtener todos los usuarios
RouterPerfil.get("/usuario/:id", async (req, res) => {
    await perfilControl.getDatosPerfil(req, res);
});

//Obtener información de perfiles
RouterPerfil.get("/", async (req, res) => {
    await perfilControl.getPerfiles(req, res);
});

//Actualizar información de perfil de usuario
RouterPerfil.patch("/usuario/:id_user", async (req, res) => {
    await perfilControl.patchPerfil(req, res);
})

//Obtener los tipos de documentos de identidad
RouterPerfil.get("/tipo_documentos", async (req, res) => {
    await perfilControl.getTipoDeDocumentos(req, res);
});

export default RouterPerfil;