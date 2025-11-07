document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("opinionForm");
    const container = document.getElementById("opinionesContainer");

    // Cargar opiniones guardadas
    let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

    const mostrarOpiniones = () => {
        container.innerHTML = "";
        if (opiniones.length === 0) {
            container.innerHTML = "<p>No hay opiniones todavía. ¡Sé el primero en opinar!</p>";
            return;
        }
        opiniones.forEach(op => {
            const div = document.createElement("div");
            div.classList.add("opinion");
            div.innerHTML = `
                <p><strong>${op.nombre}</strong> (${op.categoria})</p>
                <p>${op.mensaje}</p>
                <small>${op.fecha}</small>
            `;
            container.appendChild(div);
        });
    };

    mostrarOpiniones();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value || "Anónimo";
        const categoria = document.getElementById("categoria").value;
        const mensaje = document.getElementById("mensaje").value.trim();
        if (!mensaje) return alert("Por favor escribí un mensaje.");

        const nuevaOpinion = {
            nombre,
            categoria,
            mensaje,
            fecha: new Date().toLocaleString()
        };

        opiniones.unshift(nuevaOpinion);
        localStorage.setItem("opiniones", JSON.stringify(opiniones));

        form.reset();
        mostrarOpiniones();
        alert("¡Gracias por tu opinión!");
    });
});
