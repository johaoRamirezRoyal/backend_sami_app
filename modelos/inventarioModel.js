import connection from "../database.js";

export default class InventarioModel {
  async getInventarioIdUsuarioModel(id, page = 1, limit = 50) {
    const tabla = "inventario";
    const query = `SELECT iv.*,
                        COUNT(iv.id) AS cantidad,
                        CONCAT(u.nombre, ' ', u.apellido) AS usuario,
                        a.nombre AS area,
                        h.frecuencia_mantenimiento AS frecuencia,
                        e.nombre AS nombre_estado,
                        COALESCE(r.ultimo_mant, iv.fechareg) AS ultimo_mant
                    FROM ${tabla} iv
                    LEFT JOIN usuarios u ON u.id_user = iv.id_user
                    LEFT JOIN areas a ON a.id = iv.id_area
                    LEFT JOIN hoja_vida h ON h.id_inventario = iv.id
                    LEFT JOIN estado e ON e.id = iv.estado
                    LEFT JOIN (
                        SELECT r1.id_inventario, MAX(r1.fechareg) AS ultimo_mant
                        FROM reportes r1
                        WHERE r1.estado = 6
                        GROUP BY r1.id_inventario
                    ) r ON r.id_inventario = iv.id
                    WHERE iv.id_user = :id_user
                    AND iv.estado NOT IN (5)
                    AND iv.confirmado NOT IN (2)
                    AND iv.activo = 1
                    GROUP BY iv.descripcion
                    ORDER BY iv.descripcion
                    LIMIT :limit OFFSET :offset;`;
    const [results] = await connection.query(query, {
      id_user: id,
      limit: Number(limit),
      offset: Number((page - 1) * limit),
    });

    const countQuery = `SELECT COUNT(DISTINCT CONCAT(iv.descripcion)) AS total FROM inventario iv WHERE iv.id_user = :id_user AND iv.estado NOT IN (5) AND iv.confirmado NOT IN (2) AND iv.activo = 1;`;
    const [countResults] = await connection.execute(countQuery, {
      id_user: id,
    });
    const total = countResults[0].total;

    return {
      total,
      totalPage: Math.ceil(total / limit),
      limit,
      page,
      data: results,
    };
  }

  async getInventarioGeneralModel(page = 1, limit = 50) {
    const tabla = "inventario";
    const query = `SELECT i.*, concat(u.apellido,' ', u.nombre) AS user_name, c.nombre AS nombre_categoria, e.nombre AS estado, a.nombre AS nom_area, count(i.id) AS cantidad
                        FROM ${tabla} i 
                        LEFT JOIN usuarios u ON u.id_user = i.id_user
                        LEFT JOIN categoria c ON c.id = i.id_categoria 
                        LEFT JOIN estado e ON e.id = i.estado 
                        LEFT JOIN areas a ON a.id = i.id_area 
                        WHERE i.activo = 1 AND i.estado NOT IN (4, 5, 7, 8, 9, 10) AND i.confirmado = 1 
                        GROUP BY i.descripcion, i.id_area
                        LIMIT :limit
                        OFFSET :offset;`;
    const [results] = await connection.execute(query, {
      limit: Number(limit),
      offset: Number((page - 1) * limit),
    });

    const countQuery = `SELECT COUNT(DISTINCT CONCAT(descripcion, '-', id_area)) AS total FROM ${tabla} WHERE activo = 1 AND estado NOT IN (4, 5, 7, 8, 9, 10) AND confirmado = 1;`;
    const [countResults] = await connection.execute(countQuery);
    const total = countResults[0].total;

    return {
      total,
      totalPage: Math.ceil(total / limit),
      limit,
      page,
      data: results,
    };
  }

  async getInventarioDetalleListadoModel(page = 1, limit = 50) {
    const tabla = "inventario";
    const query = `SELECT 
                            iv.*,
                            e.nombre AS estado_nombre,
                            CONCAT(u.nombre, ' ', u.apellido) AS nom_user,
                            a.nombre AS nom_area,
                            COUNT(iv.id) AS cantidad
                        FROM 
                            ${tabla} iv
                            LEFT JOIN estado e ON e.id = iv.estado
                            LEFT JOIN usuarios u ON u.id_user = iv.id_user
                            LEFT JOIN areas a ON a.id = iv.id_area
                        WHERE 
                            iv.activo = 1
                            AND iv.estado NOT IN (4, 5)
                        GROUP BY 
                            iv.descripcion , u.nombre, u.apellido, a.nombre -- iv.marca, iv.modelo, e.nombre, iv.estado,
                        ORDER BY 
                            iv.id DESC
                        LIMIT :limit OFFSET :offset;`;
    const [results] = await connection.execute(query, {
      limit: Number(limit),
      offset: Number((page - 1) * limit),
    });
    const countQuery = `SELECT COUNT(DISTINCT CONCAT(iv.descripcion, '-', u.nombre, '-', u.apellido, '-', a.nombre)) AS total FROM inventario iv LEFT JOIN usuarios u ON u.id_user = iv.id_user LEFT JOIN areas a ON a.id = iv.id_area WHERE iv.activo = 1 AND iv.estado NOT IN (4, 5);`;
    const [countResults] = await connection.execute(countQuery);
    const total = countResults[0].total;
    return {
      total,
      totalPage: Math.ceil(total / limit),
      limit,
      page,
      data: results,
    };
  }

  async reportarArticuloIdModel(datos) {
    const tabla = "inventario";
    const query = `UPDATE ${tabla} SET 
                        estado = :estado, 
                        observacion = :observacion
                        WHERE id = :id_inventario AND id_area = :id_area AND id_user = :id_user
                        AND estado NOT IN (2, 4, 5, 6, 10);`;

    try {
      const [results] = await connection.query(query, {
        estado: datos.estado,
        observacion: datos.observacion || "",
        id_inventario: datos.id_inventario,
        id_area: datos.id_area,
        id_user: datos.id_user,
      });

      if (results.affectedRows !== 0) {
        return {
          success: true,
          message: "Reporte exitoso",
          data: {
            id_user: datos.id_user,
            id_area: datos.id_area,
            id_inventario: datos.id_inventario,
            estado: datos.estado,
            observacion: datos.observacion || "",
          },
        };
      }
      return {
        success: false,
        message: "No se pudo reportar el artículo (ninguna fila actualizada)",
        data: {
          id_user: datos.id_user,
          id_area: datos.id_area,
          id_inventario: datos.id_inventario,
          estado: datos.estado,
          observacion: datos.observacion || "",
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "No se pudo reportar el articulo",
        error: error.message,
        data: {
          id_user: datos.id_user,
          id_area: datos.id_area,
          id_inventario: datos.id_inventario,
          estado: datos.estado,
          observacion: datos.observacion || "",
        },
      };
    }
  }

  async insertarReporteModel(datos) {
    const tabla = "reportes";
    const query_insert = `INSERT INTO ${tabla} (id_inventario, observacion, estado, id_log, tipo_reporte, id_user, id_area, fechareg)
                                VALUES (:id_inventario, :observacion, :estado, :id_log, :tipo_reporte, :id_user, :id_area, :fechareg);`;


    try{
      const [results] = await connection.execute(query_insert, {
        id_inventario: Number(datos.id_inventario),
        observacion: datos.observacion || "",
        estado: Number(datos.estado),
        id_log: Number(datos.id_log) || Number(datos.id_user),
        tipo_reporte: Number(datos.tipo_reporte) || 1,
        id_user: Number(datos.id_user),
        id_area: Number(datos.id_area),
        fechareg:
          datos.fechareg ||
          new Date()
            .toLocaleString("sv-SE", { timeZone: "America/Bogota" })
            .slice(0, 19)
            .replace("T", " "),
      });
    
      if (results.affectedRows === 0) {
        return {
          success: false,
          message: "No se pudo insertar el reporte",
          data: {
            id_user: datos.id_user,
            id_area: datos.id_area,
            id_inventario: datos.id_inventario,
          },
        };
      }
      const query_log = `INSERT INTO inventario_log (id_inventario, id_user, id_area, id_log, estado)
                                  VALUES (:id_inventario, :id_user, :id_area, :id_log, :estado);`;
  
      const [results_log] = await connection.execute(query_log, {
        id_inventario: Number(datos.id_inventario),
        id_user: Number(datos.id_user),
        id_area: Number(datos.id_area),
        id_log: Number(datos.id_log) || Number(datos.id_user),
        estado: Number(datos.estado),
      });
  
      if (results_log.affectedRows === 0) {
        return {
          success: false,
          message: "No se pudo insertar el reporte al registro de inventario log",
          data: {
            id_user: datos.id_user,
            id_area: datos.id_area,
            id_inventario: datos.id_inventario,
          },
        };
      }

      return {
        success: true,
        message: "Reporte exitoso",
        data: {
          id_user: datos.id_user,
          id_area: datos.id_area,
          id_inventario: datos.id_inventario,
          estado: datos.estado,
          observacion: datos.observacion?.trim() || "",
        },
      };
    }catch(error){
      return {
        success: false,
        message: "No se pudo reportar el artículo",
        error: error.message,
        data: {
          id_user: datos.id_user,
          id_area: datos.id_area,
          id_inventario: datos.id_inventario,
          estado: datos.estado,
          observacion: datos.observacion?.trim() || "",
        },
      }
    }
  }

  async getDatosArticuloModel(id) {
    const tabla = "inventario";
    const query = `SELECT i.*, concat(u.apellido,' ', u.nombre) AS usuario, a.nombre AS area, 
                        c.nombre AS nom_categoria, ev.nombre AS evidencia, 
                        (SELECT r.fechareg FROM reportes r WHERE r.id_inventario = i.id AND r.id_reporte IS NULL ORDER BY r.id DESC LIMIT 1) AS fecha_reporte,
                        (SELECT (SELECT re.fecha_respuesta FROM reportes re WHERE re.id_reporte = r.id AND re.tipo_reporte = 1 AND re.id_inventario = i.id)
                              FROM reportes r WHERE r.id_reporte IS NULL AND r.id_inventario = i.id ORDER BY r.id DESC LIMIT 1) AS fecha_respuesta
                    FROM ${tabla} i
                    LEFT JOIN usuarios u ON u.id_user = i.id_user 
                    LEFT JOIN areas a ON a.id  = i.id_area 
                    LEFT JOIN categoria c ON c.id = i.id_categoria 
                    LEFT JOIN evidencias ev ON ev.id_inventario = i.id 
                    WHERE i.id = :id`;
    const [results] = await connection.execute(query, { id: Number(id) });
    if (results.length === 0) {
      return {
        success: false,
        message: "No se encontró el articulo",
        data: null,
      };
    }
    return {
      success: true,
      message: "Articulo encontrado",
      data: results[0],
    };
  }
}
