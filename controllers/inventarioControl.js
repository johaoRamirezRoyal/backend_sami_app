import InventarioModel from "../modelos/inventarioModel.js";

export default class InventarioControl {
  constructor() {
    this.inventarioModel = new InventarioModel();
  }

  async getInventarioIdUsuarioControl(req, res) {
    const { id } = req.params;
    const { page, limit } = req.query || { page: 1, limit: 50 };

    if (!id) {
      res.status(400).json({ error: "Falta el id del usuario" });
      return;
    }

    try {
      const result = await this.inventarioModel.getInventarioIdUsuarioModel(
        id,
        page,
        limit
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInventarioGeneralControl(req, res) {
    const { page, limit } = req.query || { page: 1, limit: 50 };

    try {
      const result = await this.inventarioModel.getInventarioGeneralModel(
        page,
        limit
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async reportarArticuloIdControl(req, res) {
    const { id_inventario, observacion, estado, id_area, id_user } = req.body;

    if (!id_inventario || !estado || !id_user || !id_area || !observacion) {
      res
        .status(400)
        .json({ error: "Falta parámetros en la petición", data: req.body });
      return;
    }

    const data = {
      id_inventario,
      observacion,
      estado,
      id_area,
      id_user,
    };

    try {
      const result_reporte = await this.inventarioModel.reportarArticuloIdModel(
        data
      );

      if (result_reporte.success) {
        const result_reporte_log =
          await this.inventarioModel.insertarReporteModel(data);
        if (result_reporte_log.success) {
          res.status(200).json(result_reporte);
        } else {
          res
            .status(500)
            .json({
              error: result_reporte_log.message,
              data: result_reporte_log.data,
            });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDatosArticuloControl(req, res) {
    const {id} = req.params;
    if (!id) {
      res.status(400).json({ error: "Falta el id del articulo" });
      return;
    }

    try {
      const result = await this.inventarioModel.getDatosArticuloModel(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  }
}
