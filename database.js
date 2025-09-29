import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const data = {
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT, 
}

const pool = mysql.createPool({
  host: data.host,
  user: data.user, 
  password: data.password,
  database: data.database,
  namedPlaceholders: true,
});



// Conexión inicial para validar
pool.getConnection((err) => {
  if (!err) { 
    console.log("🤖 Conectado a la base de datos");
  } else {
    console.log("❌ Error al conectar con la base de datos:", err.message);
  }
});

// Exportar el pool en modo promesa
export default pool.promise();