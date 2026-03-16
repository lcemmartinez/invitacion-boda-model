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
const form = document.getElementById('rsvp-form');

form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    btn.innerHTML = "Enviando...";

    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: JSON.stringify({
            nombre: document.getElementById('nombre').value,
            asistencia: document.getElementById('asistencia').value,
            mensaje: document.getElementById('mensaje').value
        })
    })
    .then(() => {
        alert("¡Gracias por confirmar!");
        form.reset();
        btn.disabled = false;
        btn.innerHTML = "Enviar";
    })
    .catch(error => console.error('Error!', error.message));
});