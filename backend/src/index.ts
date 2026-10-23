import express from "express";
import path from "path";
import proyectosRouter from "./routes/proyectos";

const app = express();
const PUERTO = 3000;

app.use(express.json());

// Sirve los archivos del frontend (index.html, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, "../../frontend")));

app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "¡Hola! El servidor del portfolio funciona" });
});

app.use("/api/proyectos", proyectosRouter);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});