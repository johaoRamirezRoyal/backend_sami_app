import { Router } from "express";
import UsuariosControl from "../controllers/usuariosControl.js";

const usuariosControl = new UsuariosControl(); // 👈 crea la instancia (singleton ya se encarga de no duplicar)
const RouterUsuarios = Router();

// Ruta para obtener todos los usuarios
RouterUsuarios.get("/", async (req, res) => {
    await usuariosControl.getUsuarios(req, res);
});

export default RouterUsuarios;
