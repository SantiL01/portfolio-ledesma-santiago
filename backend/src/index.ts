import express from "express";
import { pool } from "./db";
import { Proyecto } from "./types/proyecto";

const app = express();
const PUERTO = 3000;

app.use(express.json());

app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "¡Hola! El servidor del portfolio funciona" });
});

app.get("/api/proyectos", async (req, res) => {
  try {
    const [filas] = await pool.query("SELECT * FROM proyectos");
    const proyectos = filas as Proyecto[];
    res.json(proyectos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los proyectos" });
  }
});

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});