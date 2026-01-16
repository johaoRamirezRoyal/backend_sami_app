import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  validarContraseña,
  iniciarSesion,
  getUsuarioPorNombre,
  buscarUsuarioID,
  buscarUsuariosPorPerfil,
  buscarEstudianteAcudiente,
  getUsuarioConDocumento,
} from "../controllers/usuariosControl.js";

const RouterUsuarios = Router();

/**
 * Para acceder a las rutas de los usuarios es la siguiente dirección url: http://localhost:3000/api/usuarios
*/

// Ruta para obtener todos los usuarios
RouterUsuarios.get("/", async (req, res) => {
    await getUsuarios(req, res);
});

//ruta para obtener un usuario
RouterUsuarios.post("/usuario", async (req, res) => {
    await getUsuario(req, res);
});

//ruta para validar la contraseña de un usuario
RouterUsuarios.post("/validarContraseña", async (req, res) => {
    await validarContraseña(req, res);
});

//ruta para iniciar sesión
RouterUsuarios.post("/login", async (req, res) => {
    await iniciarSesion(req, res);
});

//Obtener usuario mediante nombre o documento
RouterUsuarios.get("/filtro", async (req, res) => {
    console.log("Entró al endpoint /filtro");
    await getUsuarioPorNombre(req, res);
    console.log("Terminó petición");
});

//Ruta para acceder a un usuario con su ID
RouterUsuarios.get("/:id_user", async (req, res) => {
    await buscarUsuarioID(req, res);
});

//Ruta para obtener los usuarios de un perfil en especifico
RouterUsuarios.get("/perfil/:perfil", async (req, res) => {
    await buscarUsuariosPorPerfil(req, res);
});

//Obtener usuarios de estudiantes por algun motivo no funciona TODO: ARREGLAR
RouterUsuarios.get("/estudiante/:id", async (req, res) => {
    await buscarEstudianteAcudiente(req, res);
});

//Obtener un usuario con su documento
RouterUsuarios.get("/documento/:documento", async (req, res) => {
    await getUsuarioConDocumento(req, res);
});

export default RouterUsuarios;
