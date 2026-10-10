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
