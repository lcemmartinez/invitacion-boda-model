// Inicializar Animaciones
AOS.init({ duration: 1000, once: true });

const targetDate = new Date("Nov 29, 2026 16:00:00").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").innerHTML = "¡Llegó el gran día!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `
        <span>${days}d</span>
        <span>${hours}h</span>
        <span>${minutes}m</span>
        <span>${seconds}s</span>
    `;
};

// Ejecutar de inmediato y luego cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Conexión Google Sheets
const scriptURL = 'TU_URL_DE_APPS_SCRIPT';
const rsvpForm = document.getElementById('rsvp-form');
const mensajeExito = document.getElementById('mensaje-exito');

rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue
    
    // Aquí iría tu lógica de fetch para Google Sheets
    // Por ahora, simularemos el éxito:
    
    rsvpForm.style.opacity = '0'; // Desvanecemos el formulario
    
    setTimeout(() => {
        rsvpForm.style.display = 'none'; // Lo quitamos del flujo
        mensajeExito.style.display = 'block'; // Mostramos el éxito
        mensajeExito.classList.add('fade-in-up'); // Animación de entrada
    }, 500);
});

function resetForm() {
    mensajeExito.style.display = 'none';
    rsvpForm.style.display = 'block';
    rsvpForm.style.opacity = '1';
    rsvpForm.reset();
}

// Cerrar si hacen clic fuera de la caja blanca
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Función para copiar la CLABE al portapapeles
function copyClabe() {
    const clabe = "0123 4567 8901 2345 67"; // Pon aquí la real
    navigator.clipboard.writeText(clabe).then(() => {
        alert("CLABE copiada al portapapeles");
    });
}