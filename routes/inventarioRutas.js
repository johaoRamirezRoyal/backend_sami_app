import {Router} from "express";
import InventarioControl from "../controllers/inventarioControl.js";

const RouterInventario = new Router();

//Para acceder a las rutas de inventario es la siguiente dirección url: http://localhost:3000/api/inventario
const inventarioControl = new InventarioControl();

//Obtener inventario de un usuario
RouterInventario.get("/:id", async (req, res) => {
    await inventarioControl.getInventarioIdUsuarioControl(req, res);
});

RouterInventario.get("/", async (req, res) => {
    await inventarioControl.getInventarioGeneralControl(req, res);
});

export default RouterInventario;