import { Router } from "express";

import {
  getActividadesMensajeroControl,
  registrarActividadesMensajeroControl,
  registrarEvidenciaActividadesMensajeroControl,
  getActividadesMensajeroIDControl,
  actualizarActividadMensajeroControl,
} from "../controllers/actividadesMensajeroControl.js";

const RouterActividadesMensajero = Router();

RouterActividadesMensajero.get("/", getActividadesMensajeroControl);
RouterActividadesMensajero.post("/", registrarActividadesMensajeroControl);
RouterActividadesMensajero.post(
  "/evidencia",
  registrarEvidenciaActividadesMensajeroControl
);
RouterActividadesMensajero.get("/id/:id", getActividadesMensajeroIDControl);
RouterActividadesMensajero.put(
  "/actualizar/:id",
  actualizarActividadMensajeroControl
);

export default RouterActividadesMensajero;
