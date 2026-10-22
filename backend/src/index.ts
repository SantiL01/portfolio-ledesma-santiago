import express from "express";
import proyectosRouter from "./routes/proyectos";

const app = express();
const PUERTO = 3000;

app.use(express.json());

app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "¡Hola! El servidor del portfolio funciona" });
});

app.use("/api/proyectos", proyectosRouter);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});