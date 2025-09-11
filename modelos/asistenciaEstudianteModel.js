import connection from "../database.js";

export default class AsistenciaEstudianteModel {
    
    //Función para obtener asistencia de un estudiante
    async getAsistenciaEstudiante(id, fecha){
        const tabla = "asistencias_estudiantes";
        const query = `SELECT * FROM ${tabla} WHERE id_user = :id AND fecha_registro = :fecha;`;
        const [results] = await connection.execute(query, {id, fecha});
        return results;
    }
    
    //Función para registrar asistencia de un estudiante
    async registrarAsistenciaEstudiante(datos){
        const tabla = "asistencias_estudiantes";
        const query = `INSERT INTO ${tabla} (documento, fecha_registro, hora_registro) VALUES (:documento, :fecha_registro, :hora_registro);`;
        const [results] = await connection.execute(query, datos);
        if(results.affectedRows > 0){
            return {message: "Registro exitoso de asistencia!", success: true};
        }else{
            return false;
        }
    }

    async getAsistenciasEstudiantesDiaHoy(){
        const tabla = "asistencias_estudiantes";
        const query = `SELECT ae.*, concat(u.nombre, ' ', u.apellido) AS nom_user, u.documento, u.correo, c.nombre AS nombre_curso
                        FROM ${tabla} ae 
                        LEFT JOIN usuarios u ON u.documento = ae.documento 
                        LEFT JOIN cursos c ON c.id = u.id_curso
                        WHERE  DATE(ae.fecha_registro) = CURDATE()
                        ORDER BY ae.hora_registro DESC; `;
        const [results] = await connection.execute(query);
        return results;
    }

}