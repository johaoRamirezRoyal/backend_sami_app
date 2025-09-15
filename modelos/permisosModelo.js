import connection from '../database.js';

export default class PermisoModel{
    
    async permisosUsuarioModel(id_opcion, perfil){
        const tabla = "cron_permisos";
        const query = `SELECT SQL_NO_CACHE * FROM ${tabla} WHERE id_perfil = :perfil AND id_opcion = :id_opcion AND activo = 1 ORDER BY id DESC LIMIT 1;`;
        const [results] = await connection.execute(query, {perfil, id_opcion});
        if(results.length > 0){
            return true;
        }else{
            return false;
        }
    }
}
