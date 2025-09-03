import connection from "../database.js";

export default class UsuariosModel {

    //Función para obtener todos los usuarios
    async getUsuarios(){
        const tabla = "usuarios";
        const query = "SELECT * FROM " + tabla + ' ORDER BY id_user ASC LIMIT 50';
        const [results] = await connection.execute(query);
        return results;
    }

}