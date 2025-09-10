import { Router } from "express";
import PerfilControl from "../controllers/perfilControl.js";

const perfilControl = new PerfilControl(); // 👈 crea la instancia (singleton ya se encarga de no duplicar)
const RouterPerfil = Router();

// Ruta para obtener todos los usuarios
RouterPerfil.get("/usuario/:id", async (req, res) => {
    await perfilControl.getDatosPerfil(req, res);
});

//Obtener información de perfiles
RouterPerfil.get("/", async (req, res) => {
    await perfilControl.getPerfiles(req, res);
})

export default RouterPerfil;