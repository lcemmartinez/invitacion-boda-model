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

const container = document.querySelector('.petals-container');

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Posición horizontal aleatoria
    petal.style.left = Math.random() * 100 + 'vw';

    // Tamaño aleatorio
    const size = Math.random() * 15 + 10;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    // Duración de caída
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';

    container.appendChild(petal);

    // Eliminar después de caer
    setTimeout(() => {
        petal.remove();
    }, 10000);
}

// Generar pétalos continuamente
setInterval(createPetal, 500); // menos carga

const canvas = document.getElementById('petals-canvas');
const ctx = canvas.getContext('2d');

let petals = [];
const numPetals = 40;

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Imagen del pétalo
const petalImg = new Image();
petalImg.src = '/assets/img/petal.png';

// Clase pétalo
class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 20 + 10;

        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;

        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;

        this.swing = Math.random() * 2; // movimiento lateral suave
    }

    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) * this.swing;

        this.rotation += this.rotationSpeed;

        // Reaparece arriba cuando sale
        if (this.y > canvas.height) {
            this.y = -20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        ctx.drawImage(petalImg, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.globalAlpha = 0.8 + Math.sin(this.y * 0.05) * 0.2;
        ctx.restore();
    }
}

// Crear pétalos
for (let i = 0; i < numPetals; i++) {
    petals.push(new Petal());
}

// Animación
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });

    requestAnimationFrame(animate);
}

// Esperar a que cargue la imagen
petalImg.onload = () => {
    animate();
};