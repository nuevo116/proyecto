// main.js - lógica de la práctica (CineJS)

// Función: obtener precio base según la película (uso de switch)
function obtenerPrecioBase(pelicula) {
    switch (pelicula) {
        case 'Núremberg':
            return 10;
        case 'Zootrópolis 2':
            return 15;
        case 'Drácula':
            return 20;
        default:
            return 0;
    }
}

// Función: aplicar descuento según la edad (uso de if/else)
function aplicarDescuento(precioBase, edad) {
    if (edad <= 10) {
        // Niños: 50% descuento
        return precioBase * 0.5;
    } else if (edad > 60) {
        // Jubilados: 40% descuento
        return precioBase * 0.6;
    } else {
        // Adultos: sin descuento
        return precioBase;
    }
}

// Validación de datos
function validarDatos(pelicula, edad, cantidad) {
    if (!pelicula || pelicula.trim() === '') {
        alert('Por favor, selecciona una película.');
        return false;
    }
    if (isNaN(edad) || edad < 0) {
        alert('Introduce una edad válida (0 o mayor).');
        return false;
    }
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('La cantidad de entradas debe ser al menos 1.');
        return false;
    }
    return true;
}

// Función: generar tickets en el DOM (uso de for)
function generarTickets(cantidad, pelicula, edad, precioUnitario) {
    const container = document.getElementById('ticketsContainer');
    container.innerHTML = ''; // limpiar antes de pintar
    for (let i = 1; i <= cantidad; i++) {
        const ticket = document.createElement('div');
        ticket.className = 'ticket';
        ticket.innerHTML = `
            <div class="titulo">${pelicula} — Entrada #${i}</div>
            <div class="detalle">Edad: ${edad} años</div>
            <div class="detalle">Butaca: Fila ${Math.ceil(Math.random()*10)}, Asiento ${Math.ceil(Math.random()*20)}</div>
            <div class="precio">Precio: €${precioUnitario.toFixed(2)}</div>
        `;
        container.appendChild(ticket);
    }
}

// Función principal que procesa la compra
function procesarCompra() {
    const pelicula = document.getElementById('pelicula').value;
    const edad = Number(document.getElementById('edad').value);
    const cantidad = Number(document.getElementById('cantidad').value);

    // Validar
    if (!validarDatos(pelicula, edad, cantidad)) {
        return;
    }

    // Obtener precio base mediante switch
    const precioBase = obtenerPrecioBase(pelicula);
    // Aplicar descuento mediante if/else
    const precioConDescuento = aplicarDescuento(precioBase, edad);
    // Precio final por unidad
    const precioUnitario = precioConDescuento;
    // Precio total
    const total = precioUnitario * cantidad;

    // Mostrar mensaje de total
    const mensajeEl = document.getElementById('mensajeTotal');
    mensajeEl.textContent = `Precio total: €${total.toFixed(2)} (${cantidad} × €${precioUnitario.toFixed(2)} cada una)`;

    // Generar tickets con bucle for
    generarTickets(cantidad, pelicula, edad, precioUnitario);
}

// Funciones adicionales: open trailer y seleccionar película desde tarjeta
function openTrailer(pelicula) {
    // Abrimos una búsqueda de YouTube en nueva pestaña
    const query = encodeURIComponent(pelicula + ' trailer oficial');
    const url = 'https://www.youtube.com/results?search_query=' + query;
    window.open(url, '_blank');
}

function selectMovieFromCard(pelicula) {
    document.getElementById('pelicula').value = pelicula;
    // Scroll suave al formulario
    document.getElementById('pelicula').scrollIntoView({behavior:'smooth', block:'center'});
}

// Reset del formulario y zona de tickets
function resetForm() {
    document.getElementById('formCompra').reset();
    document.getElementById('mensajeTotal').textContent = '';
    document.getElementById('ticketsContainer').innerHTML = '';
}

// Validación extra: evitar edad decimal y limitar cantidad
document.getElementById('edad').addEventListener('input', function(e){
    if (this.value) this.value = Math.max(0, Math.floor(Number(this.value)));
});
document.getElementById('cantidad').addEventListener('input', function(e){
    if (this.value) this.value = Math.max(1, Math.floor(Number(this.value)));
});

// --- POPUP DE OFERTA ---

function mostrarPopupOferta() {
    const popup = document.getElementById("popupOferta");
    popup.classList.add("popup-visible");
}

function cerrarPopupOferta() {
    const popup = document.getElementById("popupOferta");
    popup.classList.remove("popup-visible");
}

// Evento para cerrar el popup
document.getElementById("cerrarPopup").addEventListener("click", cerrarPopupOferta);

// Mostrar popup a los 2 segundos de cargar la página
window.onload = () => {
    setTimeout(mostrarPopupOferta, 2000);
};

