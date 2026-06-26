import express from "express";
import db from "./src/config/database.js";
import Movie from "./src/models/movie.model.js";
import movieRoutes from "./src/routes/movie.routes.js";

const app = express();

app.use(express.json());

try {
  await db.authenticate();
  console.log(" Conexión a la base de datos establecida con éxito.");
  await db.sync();
  console.log(" Modelos sincronizados con la base de datos.");
} catch (error) {
  console.error(" No se pudo conectar a la base de datos:", error);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
