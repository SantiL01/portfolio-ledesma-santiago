// MODO OSCURO
const toggleTema = document.getElementById("theme");

toggleTema.addEventListener("click", function () {
    document.body.classList.toggle("oscuro", toggleTema.checked); // body.oscuro en CSS, toggleTema.checked vale true si el interruptor está activado y false si no
    /*
    if (document.body.classList.contains("oscuro")) {
        toggleTema.textContent = "Modo Claro";
    } else {
        toggleTema.textContent = "Modo Oscuro";
    }
    */
});

// CONTADOR DE CARACTERES EN EL FORMULARIO DE CONTACTO
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

mensaje.addEventListener("input", function () {
    const cantidad = mensaje.value.length;
    contador.textContent = cantidad + " / 300";
    if (cantidad >= 250) {
        contador.style.color = "#dc2626";
    } else {
        contador.style.color = "";
    }
});

// VALIDACIÓN DEL FORMULARIO DE CONTACTO
const formulario = document.getElementById("form-contacto");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const errorNombre = document.getElementById("error-nombre");
const errorEmail = document.getElementById("error-email");
const errorMensaje = document.getElementById("error-mensaje");
const resultado = document.getElementById("resultado");
// son los campos, los <span> vacios donde van los mensajes de error y el <p> del resultado.

const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // frena el comportamiento por defecto del formulario, que es recargar la pagina.

    let valido = true;
    if (nombre.value.trim().length < 3) { // trim() elimina los espacios en blanco al inicio y al final del valor del campo. Sino se podria validar escribiendo tres espacios en blanco.
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
        nombre.classList.add("invalido");
        nombre.classList.remove("valido");
        valido = false;
    } else {
        errorNombre.textContent = "";
        nombre.classList.add("valido");
        nombre.classList.remove("invalido");
    }

    if (!patronEmail.test(email.value.trim())) { 
        errorEmail.textContent = "Ingresa un email válido.";
        email.classList.add("invalido");
        email.classList.remove("valido");
        valido = false;
    } else {
        errorEmail.textContent = "";
        email.classList.add("valido");
        email.classList.remove("invalido");
    }
    
    if (mensaje.value.trim().length < 10) {
        errorMensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
        mensaje.classList.add("invalido");
        mensaje.classList.remove("valido");
        valido = false;
    } else {
        errorMensaje.textContent = "";
        mensaje.classList.add("valido");
        mensaje.classList.remove("invalido");
    }

    if (valido) {
        resultado.textContent = "¡Gracias " + nombre.value.trim() + "! Tu mensaje fue enviado correctamente.";
        formulario.reset();
        contador.textContent = "0 / 300";
        nombre.classList.remove("valido");
        email.classList.remove("valido");
        mensaje.classList.remove("valido");
    } else {
        resultado.textContent = "";
    }
});

// =====================================================
// PROYECTOS DESDE EL BACKEND (CRUD)
// =====================================================

const API_PROYECTOS = "/api/proyectos";

const listaProyectos = document.getElementById("lista-proyectos");
const listaAdmin = document.getElementById("lista-admin");
const btnAdmin = document.getElementById("btn-admin");
const panelAdmin = document.getElementById("panel-admin");
const formProyecto = document.getElementById("form-proyecto");
const tituloFormProyecto = document.getElementById("titulo-form-proyecto");
const btnCancelar = document.getElementById("btn-cancelar");
const mensajeAdmin = document.getElementById("mensaje-admin");

const campoId = document.getElementById("proyecto-id");
const campoNombre = document.getElementById("proyecto-nombre");
const campoDescripcion = document.getElementById("proyecto-descripcion");
const campoTecnologias = document.getElementById("proyecto-tecnologias");
const campoImagen = document.getElementById("proyecto-imagen");
const campoEnlace = document.getElementById("proyecto-enlace");
const campoEstado = document.getElementById("proyecto-estado");

let todosLosProyectos = []; // copia de los proyectos que trajo el servidor

const FLECHA_SVG = `
  <svg viewBox="0 0 24 24" class="ARR" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
  </svg>`;

// Evita que un texto con símbolos como < o > se interprete como HTML
function escaparHTML(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Arma el HTML de una tarjeta a partir de un proyecto
function crearTarjeta(proyecto) {
  let html = `<article class="tarjeta">`;

  if (proyecto.imagen) {
    html += `<img src="${escaparHTML(proyecto.imagen)}" alt="Imagen de ${escaparHTML(proyecto.nombre)}">`;
  }

  html += `
    <h3>${escaparHTML(proyecto.nombre)}</h3>
    <p>${escaparHTML(proyecto.descripcion)}</p>
    <p class="tecnologias"><strong>Tecnologías:</strong> ${escaparHTML(proyecto.tecnologias)}</p>`;

  if (proyecto.enlace) {
    html += `
      <a href="${escaparHTML(proyecto.enlace)}" target="_blank" rel="noopener" class="btn-github">
        ${FLECHA_SVG.replace("ARR", "arr-2")}
        <span class="text">Ver proyecto</span>
        <span class="circle"></span>
        ${FLECHA_SVG.replace("ARR", "arr-1")}
      </a>`;
  }

  html += `</article>`;
  return html;
}

// Muestra en la sección pública solo los proyectos publicados
function mostrarProyectosPublicos(proyectos) {
  const publicados = proyectos.filter((p) => p.estado === "publicado");

  if (publicados.length === 0) {
    listaProyectos.innerHTML = "<p>Todavía no hay proyectos publicados.</p>";
    return;
  }
  listaProyectos.innerHTML = publicados.map(crearTarjeta).join("");
}

// Muestra la lista del panel de administración (todos, incluidos los borradores)
function mostrarListaAdmin(proyectos) {
  listaAdmin.innerHTML = "";

  for (const proyecto of proyectos) {
    const item = document.createElement("li");

    const info = document.createElement("span");
    info.textContent = proyecto.nombre;

    const etiqueta = document.createElement("span");
    etiqueta.textContent = proyecto.estado;
    etiqueta.classList.add("etiqueta-estado", proyecto.estado);
    info.appendChild(etiqueta);

    const acciones = document.createElement("div");
    acciones.classList.add("acciones-admin");

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn", "btn-chico");
    btnEditar.addEventListener("click", () => editarProyecto(proyecto));

    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn", "btn-chico", "btn-peligro");
    btnEliminar.addEventListener("click", () => eliminarProyecto(proyecto));

    acciones.append(btnEditar, btnEliminar);
    item.append(info, acciones);
    listaAdmin.appendChild(item);
  }
}

// READ: pide los proyectos al servidor y los muestra
async function cargarProyectos() {
  try {
    const respuesta = await fetch(API_PROYECTOS);
    if (!respuesta.ok) {
      throw new Error("El servidor respondió con el código " + respuesta.status);
    }
    todosLosProyectos = await respuesta.json();
    mostrarProyectosPublicos(todosLosProyectos);
    mostrarListaAdmin(todosLosProyectos);
  } catch (error) {
    console.error(error);
    listaProyectos.innerHTML = "<p>No se pudieron cargar los proyectos. ¿Está encendido el servidor?</p>";
  }
}

function mostrarMensajeAdmin(texto, esError) {
  mensajeAdmin.textContent = texto;
  mensajeAdmin.classList.toggle("con-error", esError);
}

// Vuelve el formulario al modo "Nuevo proyecto"
function limpiarFormulario() {
  formProyecto.reset();
  campoId.value = "";
  tituloFormProyecto.textContent = "Nuevo proyecto";
  btnCancelar.classList.add("oculto");
}

// Carga los datos de un proyecto en el formulario para editarlo
function editarProyecto(proyecto) {
  campoId.value = proyecto.id;
  campoNombre.value = proyecto.nombre;
  campoDescripcion.value = proyecto.descripcion;
  campoTecnologias.value = proyecto.tecnologias;
  campoImagen.value = proyecto.imagen ?? "";
  campoEnlace.value = proyecto.enlace ?? "";
  campoEstado.value = proyecto.estado;

  tituloFormProyecto.textContent = "Editando: " + proyecto.nombre;
  btnCancelar.classList.remove("oculto");
  mostrarMensajeAdmin("", false);
  formProyecto.scrollIntoView({ behavior: "smooth" });
}

// DELETE: elimina un proyecto
async function eliminarProyecto(proyecto) {
  const confirmado = confirm(`¿Seguro que querés eliminar "${proyecto.nombre}"?`);
  if (!confirmado) return;

  try {
    const respuesta = await fetch(`${API_PROYECTOS}/${proyecto.id}`, { method: "DELETE" });
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensajeAdmin(datos.error, true);
      return;
    }
    mostrarMensajeAdmin(datos.mensaje, false);
    if (Number(campoId.value) === proyecto.id) limpiarFormulario();
    cargarProyectos();
  } catch (error) {
    console.error(error);
    mostrarMensajeAdmin("No se pudo conectar con el servidor.", true);
  }
}

// CREATE y UPDATE: el mismo formulario sirve para las dos cosas
formProyecto.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const proyecto = {
    nombre: campoNombre.value,
    descripcion: campoDescripcion.value,
    tecnologias: campoTecnologias.value,
    imagen: campoImagen.value.trim(),
    enlace: campoEnlace.value.trim(),
    estado: campoEstado.value,
  };

  const id = campoId.value;
  const metodo = id ? "PUT" : "POST"; // si hay id, estamos editando
  const url = id ? `${API_PROYECTOS}/${id}` : API_PROYECTOS;

  try {
    const respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proyecto),
    });
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      // el servidor devuelve { errores: [...] } o { error: "..." }
      const texto = datos.errores ? datos.errores.join(" ") : datos.error;
      mostrarMensajeAdmin(texto, true);
      return;
    }

    mostrarMensajeAdmin(id ? "Proyecto actualizado." : "Proyecto creado.", false);
    limpiarFormulario();
    cargarProyectos();
  } catch (error) {
    console.error(error);
    mostrarMensajeAdmin("No se pudo conectar con el servidor.", true);
  }
});

btnCancelar.addEventListener("click", function () {
  limpiarFormulario();
  mostrarMensajeAdmin("", false);
});

// Mostrar u ocultar el panel de administración
btnAdmin.addEventListener("click", function () {
  panelAdmin.classList.toggle("oculto");
  const visible = !panelAdmin.classList.contains("oculto");
  btnAdmin.textContent = visible ? "Ocultar administración" : "Administrar proyectos";
});

// Al abrir la página, traer los proyectos
cargarProyectos();