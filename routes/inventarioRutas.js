import {Router} from "express";
import {
  getInventarioIdUsuarioControl,
  getInventarioGeneralControl,
  reportarArticuloIdControl,
  getDatosArticuloControl,
} from "../controllers/inventarioControl.js";

const RouterInventario = new Router();

//Para acceder a las rutas de inventario es la siguiente dirección url: http://localhost:3000/api/inventario


//Obtener inventario de un usuario
RouterInventario.get("/usuario/:id", async (req, res) => {
    await getInventarioIdUsuarioControl(req, res);
});

//Obtener todo el inventario paginado
RouterInventario.get("/", async (req, res) => {
    await getInventarioGeneralControl(req, res);
});

//Reportar un articulo con el id de inventario
RouterInventario.post("/reportar", async (req, res) => {
    await reportarArticuloIdControl(req, res);
});

//Ver información de un articulo con el id de inventario
RouterInventario.get("/articulo/:id", async (req, res) => {
    await getDatosArticuloControl(req, res);
});

export default RouterInventario;
