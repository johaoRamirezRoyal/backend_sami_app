import { getPool } from "../database.js";

export default class UsuariosModel {
  //Función para obtener todos los usuarios
  async getUsuarios(cantidad = 10) {
    const tabla = "usuarios";
    let pool = getPool();
    const query = `SELECT id_user, documento, nombre, apellido, correo, telefono, asignatura, user, perfil, estado, id_nivel, id_curso, id_grupo, foto_carnet
                        FROM ${tabla} 
                        WHERE estado = 'activo' AND perfil NOT IN (1, 6, 17)
                        ORDER BY id_user ASC LIMIT ?;`;
    const [results] = await pool.query(query, [Number(cantidad)]);
    return results;
  }

  //Obtener un usuario mediante su user
  async getUsuarioUser(user) {
    const tabla = "usuarios";
    let pool = getPool();
    const query = `SELECT u.id_user, u.estado, u.nombre, u.apellido, u.correo, u.perfil, u.id_nivel, u.documento, u.pass, n.nombre AS nom_nivel, p.nombre AS nom_perfil
                        FROM ${tabla} u 
                        LEFT JOIN nivel n ON n.id = u.id_nivel
                        LEFT JOIN perfiles p ON p.id_perfil = u.perfil 
                        WHERE user = :user;`;
    const [[results]] = await pool.query(query, { user });
    return results;
  }

  //Validar la contraseña de un usuario mediante su ID
  async validarContraseña(id_user, contraseña) {
    const tabla = "usuarios";
    let pool = getPool();
    const query = `SELECT u.id_user, u.nombre, u.correo, u.perfil, u.nivel, u.documento FROM ${tabla} u WHERE id_user = :id_user AND password = :contraseña;`;
    const [results] = await pool.query(query, { id_user, contraseña });
    return results;
  }

  async buscarUsuarioID(id_user) {
    const tabla = "usuarios";
    let pool = getPool();
    const query = `SELECT u.id_user, u.estado, u.nombre, u.correo, u.perfil, u.id_nivel, u.documento FROM ${tabla} u WHERE id_user = :id_user;`;
    const [[results]] = await pool.query(query, { id_user });
    return results;
  }

  //Obtener usuarios de perfiles específicos
  async getUsuariosPorPerfil(perfil) {
    const tabla = "usuarios";
    let pool = getPool();
    const query = `SELECT id_user, documento, nombre, apellido, correo, telefono, asignatura, user, perfil, estado, id_nivel, id_curso, id_grupo, foto_carnet
                        FROM ${tabla} 
                        WHERE estado = 'activo' AND perfil = :perfil
                        ORDER BY id_user ASC;`;
    const [results] = await pool.query(query, { perfil });
    return results;
  }

  async getEstudianteAcudiente(id) {
    const tabla = "estudiantes_padres";
    let pool = getPool();
    const query = `SELECT
                        est.id AS id_vinculo,
                        u.id_user,
                        u.documento,
                        u.nombre,
                        u.apellido,
                        u.correo,
                        u.perfil,
                        u.telefono,
                        c.nombre AS nom_curso,
                        n.nombre AS nom_nivel,
                        u.id_nivel,
                        (SELECT cc.nombre FROM curso cc WHERE cc.id = c.curso_proximo) as curso_proximo,
                        (SELECT cc.nombre FROM curso cc WHERE cc.id = u.curso_proximo_user) as curso_proximo_est
                        FROM ${tabla} est
                        LEFT JOIN usuarios u ON u.id_user = est.id_estudiante
                        LEFT JOIN curso c ON c.id = u.id_curso
                        LEFT JOIN nivel n ON n.id = u.id_nivel
                        WHERE est.id_acudiente = :id AND u.estado = 'activo';`;
    const [results] = await pool.query(query, { id });
    return results;
  }

  async getUsuarioConDocumento(documento) {
    const tabla = "usuarios";
    let pool = getPool();
    const query = `SELECT u.id_user, u.estado, u.nombre, u.apellido, u.correo, u.perfil, u.id_nivel, u.documento, u.pass, n.nombre AS nom_nivel, p.nombre AS nom_perfil
                        FROM ${tabla} u 
                        LEFT JOIN nivel n ON n.id = u.id_nivel
                        LEFT JOIN perfiles p ON p.id_perfil = u.perfil 
                        WHERE u.documento = :documento;`;
    const [results] = await pool.query(query, { documento });
    return results[0] || null;
  }

  async getUsuarioPorNombre(nombre) {
    const tabla = "usuarios";
    let pool = getPool();
    const query = `
            SELECT * 
            FROM ${tabla} 
            WHERE CONCAT(nombre, ' ', apellido, ' ', documento) LIKE ?;
        `;
    const [results] = await pool.query(query, [`%${nombre}%`]);
    return results;
  }
}
