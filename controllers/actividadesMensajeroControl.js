import ActividadesMensajeroModel from "../modelos/actividadesMensajeroModel.js";

const actividadesMensajeroModel = new ActividadesMensajeroModel();

export async function getActividadesMensajeroControl(req, res) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;

  try {
    const result = await actividadesMensajeroModel.obtenerActividadesMensajero(
      page,
      limit
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function registrarActividadesMensajeroControl(req, res) {
  const { id_user, actividad, fecha_inicio, fecha_final, observacion, estado } =
    req.body;

  if (!id_user || !actividad || !fecha_inicio || !fecha_final || !estado) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros en la petición", data: req.body });
  }

  try {
    const result =
      await actividadesMensajeroModel.registrarActividadesMensajero({
        id_user,
        actividad,
        fecha_inicio,
        fecha_final,
        observacion,
        estado,
      });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function registrarEvidenciaActividadesMensajeroControl(req, res) {
  const { id, evidencia } = req.body;

  if (!id || !evidencia) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros en la petición", data: req.body });
  }

  try {
    const base64Data = evidencia.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const result =
      await actividadesMensajeroModel.registrarEvidenciaActividadesMensajero({
        id,
        evidencia: buffer,
      });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getActividadesMensajeroIDControl(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Falta el id de la actividad" });
  }

  try {
    const result = await actividadesMensajeroModel.getActividadesMensajeroID(
      id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function actualizarActividadMensajeroControl(req, res) {
  const { id, actividad, fecha_inicio, fecha_final, observacion, estado } =
    req.body;

  if (!id || !actividad || !fecha_inicio || !fecha_final || !estado) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros en la petición", data: req.body });
  }

  try {
    const result = await actividadesMensajeroModel.actualizarActividadMensajero(
      {
        id,
        actividad,
        fecha_inicio,
        fecha_final,
        observacion,
        estado,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
