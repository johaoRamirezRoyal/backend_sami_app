import {Router} from "express";
import {
  permisosUsuarioControl,
  getOpcionesPermisosControl,
} from "../controllers/permisosControl.js";

const RouterPermisos = new Router();

//Para acceder a las rutas de los permisos es la siguiente dirección url: http://localhost:3000/api/permisos

//Obtener permisos para un usuario con el perfil
RouterPermisos.get("/", async (req, res) => {
    await permisosUsuarioControl(req, res);
});

//Obtener las opciones generales de los permisos
RouterPermisos.get("/opciones", async (req, res) => {
    await getOpcionesPermisosControl(req, res);
});

export default RouterPermisos;