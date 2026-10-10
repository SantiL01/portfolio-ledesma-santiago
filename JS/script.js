// MODO OSCURO
const btnTema = document.getElementById("btn-tema");

btnTema.addEventListener("click", function () {
    document.body.classList.toggle("oscuro"); // body.oscuro en CSS
    if (document.body.classList.contains("oscuro")) {
        btnTema.textContent = "Modo Claro";
    } else {
        btnTema.textContent = "Modo Oscuro";
    }
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

