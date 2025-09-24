import {Router} from "express";
import InventarioControl from "../controllers/inventarioControl.js";

const RouterInventario = new Router();

//Para acceder a las rutas de inventario es la siguiente dirección url: http://localhost:3000/api/inventario
const inventarioControl = new InventarioControl();

//Obtener inventario de un usuario
RouterInventario.get("/usuario/:id", async (req, res) => {
    await inventarioControl.getInventarioIdUsuarioControl(req, res);
});

//Obtener todo el inventario paginado
RouterInventario.get("/", async (req, res) => {
    await inventarioControl.getInventarioGeneralControl(req, res);
});

//Reportar un articulo con el id de inventario
RouterInventario.post("/reportar", async (req, res) => {
    await inventarioControl.reportarArticuloIdControl(req, res);
});

//Ver información de un articulo con el id de inventario
RouterInventario.get("/articulo/:id", async (req, res) => {
    await inventarioControl.getDatosArticuloControl(req, res);
});

export default RouterInventario;
