import { Router } from "express";
import UsuariosControl from "../controllers/usuariosControl.js";

const usuariosControl = new UsuariosControl(); // 👈 crea la instancia (singleton ya se encarga de no duplicar)
const RouterUsuarios = Router();

/**
 * Para acceder a las rutas de los usuarios es la siguiente dirección url: http://localhost:3000/api/usuarios
*/

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

//Obtener usuario mediante nombre o documento
RouterUsuarios.get("/filtro", async (req, res) => {
    console.log("Entró al endpoint /filtro");
    await usuariosControl.getUsuarioPorNombre(req, res);
    console.log("Terminó petición");
});

//Ruta para acceder a un usuario con su ID
RouterUsuarios.get("/:id_user", async (req, res) => {
    await usuariosControl.buscarUsuarioID(req, res);
});

//Ruta para obtener los usuarios de un perfil en especifico
RouterUsuarios.get("/perfil/:perfil", async (req, res) => {
    await usuariosControl.buscarUsuariosPorPerfil(req, res);
});

//Obtener usuarios de estudiantes por algun motivo no funciona TODO: ARREGLAR
RouterUsuarios.get("/estudiante/:id", async (req, res) => {
    await usuariosControl.buscarEstudianteAcudiente(req, res);
});

//Obtener un usuario con su documento
RouterUsuarios.get("/documento/:documento", async (req, res) => {
    await usuariosControl.getUsuarioConDocumento(req, res);
});


export default RouterUsuarios;
