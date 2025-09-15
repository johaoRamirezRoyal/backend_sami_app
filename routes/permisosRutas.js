import {Router} from "express";
import PermisosControl from "../controllers/permisosControl.js";

const RouterPermisos = new Router();

//Para acceder a las rutas de los permisos es la siguiente dirección url: http://localhost:3000/api/permisos
const permisosControl = new PermisosControl();

//Obtener permisos para un usuario con el perfil
RouterPermisos.get("/", async (req, res) => {
    await permisosControl.permisosUsuarioControl(req, res);
});

export default RouterPermisos;