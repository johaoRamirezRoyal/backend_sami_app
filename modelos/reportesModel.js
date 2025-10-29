import connection from "../database.js";

export default class ReportesModel {
  async getReportesGeneral() {
    const tabla = "inventario";
    const query = `SELECT DISTINCT SQL_NO_CACHE
                            iv.*,
                            (SELECT e.nombre FROM estado e WHERE e.id = iv.estado) AS nom_estado,
                            (SELECT a.nombre FROM areas a WHERE a.id = iv.id_area) AS AREA,
                            (SELECT CONCAT(u.nombre, ' ', u.apellido) FROM usuarios u WHERE u.id_user = rp.id_user) AS usuario,
                            (SELECT r.fechareg FROM reportes r WHERE r.id_inventario = iv.id ORDER BY r.id DESC LIMIT 1) AS fecha_reporte,
                            (SELECT r.id FROM reportes r WHERE r.id_inventario = iv.id ORDER BY r.id DESC LIMIT 1) AS id_reporte,
                            CONCAT(u.nombre, ' ', u.apellido) AS nom_usuario,
                            ar.nombre AS nom_area,
                            rp.id AS reporte_id
                        FROM ${tabla} iv
                        INNER JOIN reportes rp ON rp.id_inventario = iv.id
                        LEFT JOIN usuarios u ON u.id_user = iv.id_user
                        LEFT JOIN areas ar ON ar.id = rp.id_area
                        WHERE iv.estado = 2 AND iv.activo = 1 AND rp.estado = 2
                        AND NOT EXISTS (
                            SELECT 1
                            FROM reportes rpe
                            WHERE rpe.id_reporte = rp.id AND rpe.estado = 3
                        )
                        ORDER BY fecha_reporte DESC;`;
    const [results] = await connection.execute(query);
    return results;
  }

  async getInformacionReporteArticulo(id) {
    const tabla = "reportes";
    const query = `SELECT * FROM ${tabla} WHERE id_inventario = :id ORDER BY id DESC LIMIT 1;`;
    const [results] = await connection.execute(query, { id: Number(id) });
    return results[0];
  }

  async solucionarReporte(datos) {
    
    const conn = await connection.getConnection(); // 👈 obtener una conexión del pool
    try {
      await conn.beginTransaction();

      // 1️⃣ Insertar en reportes
      await conn.execute(
        `
            INSERT INTO reportes (
                id_inventario, observacion, estado, id_log, id_resp, fecha_respuesta,
                tipo_reporte, id_reporte, id_user, id_area
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          datos.id_inventario,
          datos.observacion || "",
          datos.estado,
          datos.id_log || datos.id_user,
          datos.id_resp,
          datos.fecha_respuesta,
          datos.tipo_reporte || 1,
          datos.id_reporte,
          datos.id_user,
          datos.id_area,
        ]
      );

      // 2️⃣ Actualizar inventario
      await conn.execute(
        `
            UPDATE inventario
            SET observacion = ?, estado = ?
            WHERE id = ?
        `,
        [datos.observacion || "", datos.estado, datos.id_inventario]
      );

      // 3️⃣ Insertar log
      const [result] = await conn.execute(
        `
            INSERT INTO inventario_log (id_inventario, id_user, id_area, id_log, estado)
            VALUES (?, ?, ?, ?, ?)
        `,
        [
          datos.id_inventario,
          datos.id_user,
          datos.id_area,
          datos.id_log || datos.id_user,
          datos.estado,
        ]
      );

      await conn.commit(); // ✅ confirmar la transacción
      conn.release(); // ✅ liberar la conexión

      return {
        success: true,
        message: "Reporte solucionado correctamente",
        data: {
          id_user: datos.id_user,
          id_area: datos.id_area,
          id_inventario: datos.id_inventario,
          estado: datos.estado,
          observacion: datos.observacion || "",
        },
      };
    } catch (error) {
      await conn.rollback(); // ❗ revertir transacción
      conn.release(); // ✅ liberar conexión incluso si hay error
      console.error("Error solucionando reporte:", error);
      return {
        success: false,
        message: "Error al solucionar el reporte",
        error,
      };
    }
  }
}
