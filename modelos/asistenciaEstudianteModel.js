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

}