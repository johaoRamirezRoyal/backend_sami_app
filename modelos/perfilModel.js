import connection from "../database.js";
export default class PerfilModel {
    //mostrar Datos de perfil de un usuario
    async getDatosPerfil(id){
        const tabla = "usuarios";
        const query = `SELECT SQL_NO_CACHE u.id_user, u.documento, u.nombre, u.apellido, u.correo, u.telefono, u.asignatura, u.user, u.perfil, u.estado, u.id_nivel, u.id_curso, u.id_grupo, u.foto_carnet,
                    (SELECT n.nombre FROM nivel n WHERE n.id = u.id_nivel) AS nom_nivel,
                    (SELECT nombre FROM perfiles WHERE id_perfil = u.perfil) AS nom_perfil,
                    (SELECT c.nombre FROM curso c WHERE c.id = u.id_curso) AS nom_curso,
                    (SELECT nombre_foto FROM foto_perfil f WHERE f.id_user = u.id_user AND f.activo = 1) AS imagen,
                    c.nombre AS curso_actual,
                    (SELECT cc.nombre FROM curso cc WHERE cc.id = u.curso_proximo_user) AS curso_proximo,
                    (SELECT cc.nombre FROM curso cc WHERE cc.id = c.curso_proximo) AS curso_proximo_anio,
                    (SELECT actividad FROM extra e WHERE e.id = ei.id_extra) AS activid
                    FROM ${tabla} u
                    LEFT JOIN curso c ON c.id = u.id_curso
                    LEFT JOIN extra_inscripcion ei ON ei.id_user = u.id_user
                    WHERE u.id_user = :id;`;

        const [results]  = await connection.execute(query, {id}); 
        return results;
    }

    async getPerfiles(){
        const tabla = "perfiles";
        const query = `SELECT SQL_NO_CACHE
                        p.*,
                        (SELECT COUNT(m.id) FROM cron_permisos m WHERE m.id_perfil = p.id_perfil AND m.activo = 1) AS cant_modulos
                        FROM ${tabla} p WHERE estado = 'activo' and id_perfil not in(1,17) ORDER BY id_perfil ASC;`;
        const [result] = await connection.execute(query);
        return result;
    }

    async patchPerfilUsuario(datos){
        const tabla = "usuarios";
        const query = `UPDATE ${tabla} SET nombre = :nombre, apellido = :apellido, correo = :correo, telefono = :telefono, 
                        documento = :documento, perfil = :perfil, id_nivel = :id_nivel WHERE id_user = :id_user;`;

        const [result] = await connection.execute(query, datos);
        if(result.affectedRows > 0){
            return true;
        }else{
            return false;
        }
    }

    async getTipoDeDocumentos(){
        const tabla = "tipo_doc";
        const query = `SELECT * FROM ${tabla} WHERE activo = 1 ORDER BY id ASC;`;
        const [results] = await connection.execute(query);
        return results;
    }

}