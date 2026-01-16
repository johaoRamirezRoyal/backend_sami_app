import UsuariosModel from "../modelos/usuariosModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usuariosModel = new UsuariosModel();

//Función para obtener todos los usuarios
export async function getUsuarios(req, res) {
  try {
    const usuarios = await usuariosModel.getUsuarios(30);
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUsuario(req, res) {
  try {
    const { usuario } = req.body;

    if (!usuario) {
      return res.status(400).json({ error: "Debe completar el campo de user" });
    }

    const data_usuario = await usuariosModel.getUsuarioUser(usuario);
    res.status(200).json(data_usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Validar la contraseña de un usuario mediante su ID
export async function validarContraseña(req, res) {
  try {
    const { id_user, contraseña } = req.body;

    if (!id_user || !contraseña) {
      return res.status(400).json({
        error: "Debe completar el los campos de id_user y contraseña",
      });
    }

    const usuario = await usuariosModel.validarContraseña(id_user, contraseña);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarUsuarioID(req, res) {
  try {
    const { id_user } = req.params;

    if (!id_user) {
      return res
        .status(400)
        .json({ error: "Debe completar el campo de id_user" });
    }

    const data_usuario = await usuariosModel.buscarUsuarioID(id_user);
    res.status(200).json(data_usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarUsuariosPorPerfil(req, res) {
  try {
    const { perfil } = req.params;

    if (!perfil) {
      return res
        .status(400)
        .json({ error: "Debe completar el campo de perfil" });
    }

    const data_usuario = await usuariosModel.getUsuariosPorPerfil(perfil);
    res.status(200).json(data_usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function buscarEstudianteAcudiente(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Debe completar el campo de id" });
    }

    const data_usuario = await usuariosModel.getEstudianteAcudiente(id);
    res.status(200).json(data_usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function iniciarSesion(req, res) {
  try {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
      return res.status(400).json({
        error: "Debe completar el los campos de usuario y contraseña",
      });
    }

    const usuario_sesion = await usuariosModel.getUsuarioUser(usuario);

    if (!usuario_sesion) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    if (usuario_sesion.estado !== "activo") {
      return res.status(400).json({
        error: "Usuario no activo, habla con el administrador de S. A. M. I",
      });
    }

    // Hash guardado en PHP ($2y$...). Reemplazar prefijo para Node.
    const hashPHP = String(usuario_sesion.pass || "");
    const hashNode = hashPHP.startsWith("$2y$")
      ? hashPHP.replace("$2y$", "$2b$")
      : hashPHP;

    const valid = await bcrypt.compare(String(contraseña), hashNode);

    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    const payload = {
      id_log: usuario_sesion.id_user,
      nombre: usuario_sesion.nombre,
      correo: usuario_sesion.correo,
      perfil: usuario_sesion.perfil,
      nom_perfil: usuario_sesion.nom_perfil,
      nom_nivel: usuario_sesion.nom_nivel,
      nivel: usuario_sesion.id_nivel,
      apellido: usuario_sesion.apellido,
      documento: usuario_sesion.documento,
      estado: usuario_sesion.estado,
    };

    const EXPIRES_IN = process.env.EXPIRES_IN || "15d";
    const SECRET = process.env.SECRET || "samiroyal";

    const token = jwt.sign(payload, SECRET, {
      expiresIn: EXPIRES_IN,
    });

    res.status(200).json({
      usuario: payload,
      token,
      message: "Sesión iniciada correctamente. " + "Hola " + payload.nombre,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUsuarioConDocumento(req, res) {
  try {
    const { documento } = req.params;
    console.log(documento);

    if (!documento || documento.trim() === "") {
      return res
        .status(400)
        .json({ error: "Debe completar el campo de documento" });
    }

    const data_usuario = await usuariosModel.getUsuarioConDocumento(documento);
    res.status(200).json(data_usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUsuarioPorNombre(req, res) {
  try {
    const { nombre } = req.query;
    console.log("Nombre recibido:", nombre);

    if (!nombre) {
      return res
        .status(400)
        .json({ error: "Debe completar el campo de nombre" });
    }

    const data_usuario = await usuariosModel.getUsuarioPorNombre(nombre);
    console.log("Resultados DB:", data_usuario);

    res.status(200).json(data_usuario);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
}
