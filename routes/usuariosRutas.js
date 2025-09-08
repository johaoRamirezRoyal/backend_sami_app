import { Router } from "express";
import UsuariosControl from "../controllers/usuariosControl.js";

const usuariosControl = new UsuariosControl(); // 👈 crea la instancia (singleton ya se encarga de no duplicar)
const RouterUsuarios = Router();

// Ruta para obtener todos los usuarios
RouterUsuarios.get("/", async (req, res) => {
    await usuariosControl.getUsuarios(req, res);
});

//ruta para obtener un usuario
RouterUsuarios.post("/usuario", async (req, res) => {
    await usuariosControl.getUsuario(req, res);
});

//ruta para validar la contraseña de un usuario
RouterUsuarios.post("/validarContraseña", async (req, res) => {
    await usuariosControl.validarContraseña(req, res);
});

//ruta para iniciar sesión
RouterUsuarios.post("/login", async (req, res) => {
    await usuariosControl.iniciarSesion(req, res);
});

export default RouterUsuarios;
