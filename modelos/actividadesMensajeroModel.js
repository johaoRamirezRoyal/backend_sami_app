import connection from "../database.js";

export default class ActividadesMensajeroModel {
    async getActividadesMensajeroID(id){
        const tabla = "actividades_mensajero";
        const query = `SELECT * FROM ${tabla} WHERE id = :id;`;
        const [results] = await connection.execute(query, {id});
        return results;
    }

    async registrarActividadesMensajero(datos){
        const tabla = "actividades_mensajero";
        const query = `INSERT INTO ${tabla} (id_user, actividad, fecha_inicio, fecha_final, observacion, estado) 
                        VALUES (:id_user, :actividad, :fecha_inicio, :fecha_final, :observacion, :estado);`;
        const [results] = await connection.execute(query, datos);
        if(results.affectedRows > 0){
            return {message: "Registro exitoso de actividades mensajero!", success: true};
        }else{
            return false;
        }
    }

    async registrarEvidenciaActividadesMensajero(datos){
        const tabla = "actividades_mensajero"; 
        const query = `UPDATE ${tabla} SET evidencia = :evidencia WHERE id = :id;`;
        const [results] = await connection.execute(query, datos);
        if(results.affectedRows > 0){
            return {message: "Registro exitoso de actividades mensajero!", success: true};
        }else{
            return false;
        }
    }

    async obtenerActividadesMensajero(page = 1, limit = 50){
        const tabla = "actividades_mensajero";
        const query = `SELECT am.*, u.nombre AS nombre_usuario
                        (SELECT nombre FROM usuarios u WHERE u.id_user = a.id_user) AS nombre_usuario,
                        FROM ${tabla} am
                        LEFT JOIN usuarios u ON u.id_user = am.id_user
                        ORDER BY a.fecha_inicio DESC
                        LIMIT :limit OFFSET :offset;`;
        const [results] = await connection.execute(query, {
              limit: Number(limit),
              offset: Number((page - 1) * limit),
        });

        const countQuery = `SELECT COUNT(DISTINCT a.id) AS total FROM ${tabla} a;`;
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

    async actualizarActividadMensajero(datos){
        const tabla = "actividades_mensajero";
        const query = `UPDATE ${tabla} SET actividad = :actividad, fecha_inicio = :fecha_inicio, fecha_final = :fecha_final, observacion = :observacion, estado = :estado WHERE id = :id;`;
        const [results] = await connection.execute(query, datos);
        if(results.affectedRows > 0){
            return {message: "Actualizacion exitosa de actividades mensajero!", success: true};
        }else{
            return {
                message: "No se pudo actualizar la actividad mensajero!",
                success: false,
            };
        }
    }

}