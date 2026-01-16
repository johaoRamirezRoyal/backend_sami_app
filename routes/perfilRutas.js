import { Router } from "express";
import {
  getDatosPerfil,
  getPerfiles,
  patchPerfil,
  getTipoDeDocumentos,
} from "../controllers/perfilControl.js";

/**
 *  Para acceder a las rutas de los perfiles es la siguiente dirección url: http://localhost:3000/api/perfil
*/

const RouterPerfil = Router();

// Ruta para obtener información de perfil del usuarios con el ID
RouterPerfil.get("/usuario/:id", async (req, res) => {
    await getDatosPerfil(req, res);
});

//Obtener información de perfiles
RouterPerfil.get("/", async (req, res) => {
    await getPerfiles(req, res);
});

//Actualizar información de perfil de usuario
RouterPerfil.patch("/usuario/:id_user", async (req, res) => {
    await patchPerfil(req, res);
});

//Obtener los tipos de documentos de identidad
RouterPerfil.get("/tipo_documentos", async (req, res) => {
    await getTipoDeDocumentos(req, res);
});

export default RouterPerfil;