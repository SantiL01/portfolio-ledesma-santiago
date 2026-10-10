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
