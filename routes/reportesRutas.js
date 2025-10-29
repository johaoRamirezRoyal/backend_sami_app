import {Router} from "express";
import ReportesControl from "../controllers/reportesControl.js";

const RouterReportes = new Router();

//Para acceder a las rutas de reportes es la siguiente dirección url: http://localhost:3000/api/reportes
const reportesControl = new ReportesControl();

//Obtener reportes de inventario
RouterReportes.get("/", async (req, res) => {
    await reportesControl.getReportesGeneral(req, res);
});

//Obtener información de un reporte de inventario
RouterReportes.get("/articulo/:id", async (req, res) => {
    await reportesControl.getInformacionReporteArticulo(req, res);
});

//Solucionar un reporte de inventario
RouterReportes.post("/solucionar", async (req, res) => {
    await reportesControl.solucionarReporte(req, res);
});

export default RouterReportes;