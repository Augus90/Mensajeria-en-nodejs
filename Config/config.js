// importo dotenv para leer las variables de entorno
import dotenv from "dotenv";
dotenv.config();

// levanto las variable desde el .env
const config = {
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
};

export default { config };