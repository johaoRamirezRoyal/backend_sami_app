import connection from '../database.js';

export default class InventarioModel{
    async getInventarioIdUsuarioModel(id){
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
                    LIMIT 400;`;
        const [results] = await connection.execute(query, {id_user: id});
        return results;
    }

    async getInventarioGeneralModel(page = 1, limit = 50){
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
        const [results] = await connection.execute(query, {limit: Number(limit), offset: Number((page - 1) * limit)});

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
    
}