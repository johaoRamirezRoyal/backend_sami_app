import { Router } from "express";
import ActividadesMensajeroControl from "../controllers/actividadesMensajeroControl.js";

const RouterActividadesMensajero = new Router();

//Para acceder a las rutas de actividades mensajero es la siguiente dirección url: http://localhost:3000/api/actividades_mensajero
const actividadesMensajeroControl = new ActividadesMensajeroControl();

//Obtener actividades mensajero de un usuario
RouterActividadesMensajero.get("/", async (req, res) => {
    await actividadesMensajeroControl.getActividadesMensajeroControl(req, res);
});

//Registrar actividades mensajero de un usuario
RouterActividadesMensajero.post("/", async (req, res) => {
    await actividadesMensajeroControl.registrarActividadesMensajeroControl(req, res);
});

//Registrar evidencia de un usuario
RouterActividadesMensajero.post("/evidencia", async (req, res) => {
    await actividadesMensajeroControl.registrarEvidenciaActividadesMensajeroControl(req, res);
});

//Obtener actividades de mensajero por ID
RouterActividadesMensajero.get("/id/:id", async (req, res) => {
    await actividadesMensajeroControl.getActividadesMensajeroIDControl(req, res);
});

//Actualizar actividades mensajero de un usuario
RouterActividadesMensajero.put("/actualizar/:id", async (req, res) => {
    await actividadesMensajeroControl.actualizarActividadMensajeroControl(req, res);
});

export default RouterActividadesMensajero;