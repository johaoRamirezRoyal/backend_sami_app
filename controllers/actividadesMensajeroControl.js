import ActividadesMensajeroModel from "../modelos/actividadesMensajeroModel.js";

export default class ActividadesMensajeroControl {
  constructor() {
    this.actividadesMensajeroModel = new ActividadesMensajeroModel();
  }

  async getActividadesMensajeroControl(req, res) {
    const { page, limit } = req.query || { page: 1, limit: 50 };

    try {
      const result =
        await this.actividadesMensajeroModel.obtenerActividadesMensajero(
          page,
          limit
        );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async registrarActividadesMensajeroControl(req, res) {
    const {
      id_user,
      actividad,
      fecha_inicio,
      fecha_final,
      observacion,
      estado,
    } = req.body;

    if (!id_user || !actividad || !fecha_inicio || !fecha_final || !estado ) {
      res
        .status(400)
        .json({ error: "Falta parámetros en la petición", data: req.body });
      return;
    }

    const data = {
      id_user,
      actividad,
      fecha_inicio,
      fecha_final,
      observacion,
      estado,
    };

    try {
      const result =
        await this.actividadesMensajeroModel.registrarActividadesMensajero(
          data
        );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async registrarEvidenciaActividadesMensajeroControl(req, res) {
    const { id, evidencia } = req.body;

    if (!id || !evidencia) {
      return res
        .status(400)
        .json({ error: "Faltan parámetros en la petición", data: req.body });
    }

    try {
      // Quita el prefijo si existe (ejemplo: data:image/png;base64,)
      const base64Data = evidencia.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const data = { id, evidencia: buffer };

      const result =
        await this.actividadesMensajeroModel.registrarEvidenciaActividadesMensajero(
          data
        );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActividadesMensajeroIDControl(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Falta el id de la actividad" });
      return;
    }
    try {
      const result =
        await this.actividadesMensajeroModel.getActividadesMensajeroID(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizarActividadMensajeroControl(req, res) {
    const { id, actividad, fecha_inicio, fecha_final, observacion, estado } =
      req.body;

    if (!id || !actividad || !fecha_inicio || !fecha_final || !estado) {
      res
        .status(400)
        .json({ error: "Falta parámetros en la petición", data: req.body });
      return;
    }

    const data = {
      id,
      actividad,
      fecha_inicio,
      fecha_final,
      observacion,
      estado,
    };

    try {
      const result =
        await this.actividadesMensajeroModel.actualizarActividadMensajero(data);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
