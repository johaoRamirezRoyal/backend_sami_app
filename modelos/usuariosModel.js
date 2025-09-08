import connection from "../database.js";

export default class UsuariosModel {

    //Función para obtener todos los usuarios
    async getUsuarios($cantidad = 10){
        const tabla = "usuarios";
        const query = `SELECT id_user, documento, nombre, apellido, correo, telefono, asignatura, user, perfil, estado, id_nivel, id_curso, id_grupo 
                        FROM ${tabla} ORDER BY id_user ASC LIMIT :limite;`;
        const [results] = await connection.execute(query, {limite: $cantidad});
        return results;
    }

    //Obtener un usuario mediante su user
    async getUsuarioUser(user){
        const tabla = "usuarios";
        const query = `SELECT u.id_user, u.estado, u.nombre, u.correo, u.perfil, u.id_nivel, u.documento, u.pass FROM ${tabla} u WHERE user = :user;`;
        const [[results]] = await connection.execute(query, {user});
        return results;
    }

    //Validar la contraseña de un usuario mediante su ID
    async validarContraseña(id_user, contraseña){
        const tabla = "usuarios";
        const query = `SELECT u.id_user, u.nombre, u.correo, u.perfil, u.nivel, u.documento FROM ${tabla} u WHERE id_user = :id_user AND password = :contraseña;`;
        const [results] = await connection.execute(query, {id_user, contraseña});
        return results;
    }
}

