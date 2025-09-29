import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const data = {
    host: process.env.DB_HOST || "localhost", 
    user: process.env.DB_USER || "samiuser",
    password: process.env.DB_PASSWORD || "Angel1413@.-+#",
    database: process.env.DB_DATABASE || "sami_royal",
    port: process.env.DB_PORT || "3306", 
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