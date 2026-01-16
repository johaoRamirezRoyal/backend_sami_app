import mysql from "mysql2/promise";

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT || 3306,

      waitForConnections: true,
      connectionLimit: 5, // IMPORTANTE en serverless
      queueLimit: 0,
      multipleStatements: true,
    });
  }

  return pool;
}



// import dotenv from "dotenv";

// dotenv.config();

// const data = {
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "sami_user",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_DATABASE || "sami_royal",
//   port: process.env.DB_PORT || "3306",
// };

// const pool = mysql.createPool({
//   host: data.host,
//   user: data.user,
//   password: data.password,
//   database: data.database,
//   namedPlaceholders: true,
//   multipleStatements: true,
// });

// // Conexión inicial para validar
// pool.getConnection((err) => {
//   if (!err) {
//     console.log("🤖 Conectado a la base de datos");
//   } else {
//     console.log("❌ Error al conectar con la base de datos:", err.message);
//   }
// });

// // Exportar el pool en modo promesa
// export default pool.promise();
