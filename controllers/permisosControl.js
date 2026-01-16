import PermisoModel from "../modelos/permisosModelo.js";

const permisoModel = new PermisoModel();

export async function permisosUsuarioControl(req, res) {
  try {
    const { id_opcion, perfil } = req.query;

    if (!id_opcion || !perfil) {
      return res
        .status(400)
        .json({ error: "Debe completar el campo de id_opcion, perfil" });
    }
    const permiso = await permisoModel.permisosUsuarioModel(
      id_opcion,
      perfil
    );
    res
      .status(200)
      .json({ permiso: permiso, message: "Permiso consultado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getOpcionesPermisosControl(req, res) {
  try {
    const opciones = await permisoModel.getOpcionesPermisosModel();
    res.status(200).json(opciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
