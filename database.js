import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const data = {
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "",
    database: process.env.DATABASE || "sami_royal",
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