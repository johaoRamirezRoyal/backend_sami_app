import {Router} from "express";

import {
  getReportesGeneral,
  getInformacionReporteArticulo,
  solucionarReporte,
} from "../controllers/reportesControl.js";

const RouterReportes = new Router();

//Para acceder a las rutas de reportes es la siguiente dirección url: http://localhost:3000/api/reportes
//Obtener reportes de inventario
RouterReportes.get("/", async (req, res) => {
    await getReportesGeneral(req, res);
});

//Obtener información de un reporte de inventario
RouterReportes.get("/articulo/:id", async (req, res) => {
    await getInformacionReporteArticulo(req, res);
});

//Solucionar un reporte de inventario
RouterReportes.post("/solucionar", async (req, res) => {
    await solucionarReporte(req, res);
});

export default RouterReportes;