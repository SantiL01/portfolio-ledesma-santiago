import { Router } from "express";
import { ResultSetHeader } from "mysql2";
import { pool } from "../db";
import { Proyecto, NuevoProyecto, EstadoProyecto } from "../types/proyecto";

const router = Router();

const ESTADOS_VALIDOS: EstadoProyecto[] = ["publicado", "borrador"];

// Revisa los datos recibidos y devuelve una lista de errores (vacía si está todo bien)
function validarProyecto(datos: Partial<NuevoProyecto>): string[] {
  const errores: string[] = [];

  if (typeof datos.nombre !== "string" || datos.nombre.trim().length < 3) {
    errores.push("El nombre es obligatorio y debe tener al menos 3 caracteres.");
  }
  if (typeof datos.descripcion !== "string" || datos.descripcion.trim().length < 10) {
    errores.push("La descripción es obligatoria y debe tener al menos 10 caracteres.");
  }
  if (typeof datos.tecnologias !== "string" || datos.tecnologias.trim() === "") {
    errores.push("Las tecnologías son obligatorias.");
  }
  if (datos.estado !== undefined && !ESTADOS_VALIDOS.includes(datos.estado)) {
    errores.push("El estado debe ser 'publicado' o 'borrador'.");
  }

  return errores;
}

// GET /api/proyectos -> lista todos los proyectos
router.get("/", async (req, res) => {
  try {
    const [filas] = await pool.query("SELECT * FROM proyectos");
    const proyectos = filas as Proyecto[];
    res.json(proyectos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los proyectos." });
  }
});

// GET /api/proyectos/:id -> trae un solo proyecto
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "El id debe ser un número." });
    return;
  }

  try {
    const [filas] = await pool.query("SELECT * FROM proyectos WHERE id = ?", [id]);
    const proyectos = filas as Proyecto[];

    if (proyectos.length === 0) {
      res.status(404).json({ error: "Proyecto no encontrado." });
      return;
    }
    res.json(proyectos[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el proyecto." });
  }
});

// POST /api/proyectos -> crea un proyecto nuevo
router.post("/", async (req, res) => {
  const datos: Partial<NuevoProyecto> = req.body;
  const errores = validarProyecto(datos);
  if (errores.length > 0) {
    res.status(400).json({ errores });
    return;
  }

  const nuevo: NuevoProyecto = {
    nombre: datos.nombre!.trim(),
    descripcion: datos.descripcion!.trim(),
    tecnologias: datos.tecnologias!.trim(),
    imagen: datos.imagen || null,
    enlace: datos.enlace || null,
    estado: datos.estado ?? "borrador",
  };

  try {
    const [resultado] = await pool.query(
      "INSERT INTO proyectos (nombre, descripcion, tecnologias, imagen, enlace, estado) VALUES (?, ?, ?, ?, ?, ?)",
      [nuevo.nombre, nuevo.descripcion, nuevo.tecnologias, nuevo.imagen, nuevo.enlace, nuevo.estado]
    );
    const { insertId } = resultado as ResultSetHeader;
    const creado: Proyecto = { id: insertId, ...nuevo };
    res.status(201).json(creado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el proyecto." });
  }
});

// PUT /api/proyectos/:id -> modifica un proyecto existente
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "El id debe ser un número." });
    return;
  }

  const datos: Partial<NuevoProyecto> = req.body;
  const errores = validarProyecto(datos);
  if (errores.length > 0) {
    res.status(400).json({ errores });
    return;
  }

  const actualizado: NuevoProyecto = {
    nombre: datos.nombre!.trim(),
    descripcion: datos.descripcion!.trim(),
    tecnologias: datos.tecnologias!.trim(),
    imagen: datos.imagen || null,
    enlace: datos.enlace || null,
    estado: datos.estado ?? "borrador",
  };

  try {
    const [resultado] = await pool.query(
      "UPDATE proyectos SET nombre = ?, descripcion = ?, tecnologias = ?, imagen = ?, enlace = ?, estado = ? WHERE id = ?",
      [actualizado.nombre, actualizado.descripcion, actualizado.tecnologias, actualizado.imagen, actualizado.enlace, actualizado.estado, id]
    );
    const { affectedRows } = resultado as ResultSetHeader;

    if (affectedRows === 0) {
      res.status(404).json({ error: "Proyecto no encontrado." });
      return;
    }
    res.json({ id, ...actualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al modificar el proyecto." });
  }
});

// DELETE /api/proyectos/:id -> elimina un proyecto
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "El id debe ser un número." });
    return;
  }

  try {
    const [resultado] = await pool.query("DELETE FROM proyectos WHERE id = ?", [id]);
    const { affectedRows } = resultado as ResultSetHeader;

    if (affectedRows === 0) {
      res.status(404).json({ error: "Proyecto no encontrado." });
      return;
    }
    res.json({ mensaje: "Proyecto eliminado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el proyecto." });
  }
});

export default router;