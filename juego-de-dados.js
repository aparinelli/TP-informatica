// ===============================
// 🎲 JUEGO DE DADOS
// ===============================

// Elementos del DOM
const dado1 = document.getElementById("dado-1");
const dado2 = document.getElementById("dado-2");
const btnTirar = document.getElementById("btn-tirar");
const btnReset = document.getElementById("btn-reset");
const puntosJugadorEl = document.getElementById("puntos-jugador");
const puntosComputadoraEl = document.getElementById("puntos-computadora");
const mensaje = document.getElementById("mensaje");

// Variables del juego
let puntosJugador = 0;
let puntosComputadora = 0;
let ronda = 1;
const rondasMaximas = 15;

// Caras de los dados (Unicode)
const caras = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

// --- Función principal: tirar los dados ---
function tirarDados() {
  if (ronda > rondasMaximas) return;

  // Animación rápida de movimiento
  dado1.classList.add("shake");
  dado2.classList.add("shake");

  setTimeout(() => {
    dado1.classList.remove("shake");
    dado2.classList.remove("shake");

    // Números aleatorios (1 a 6)
    const tirada1 = Math.floor(Math.random() * 6);
    const tirada2 = Math.floor(Math.random() * 6);

    // Mostrar los símbolos de los dados
    dado1.textContent = caras[tirada1];
    dado2.textContent = caras[tirada2];

    // Evaluar resultado del jugador
    evaluarTiradaJugador(tirada1 + 1, tirada2 + 1);
  }, 600);
}

// --- Evaluar resultado del jugador ---
function evaluarTiradaJugador(d1, d2) {
  let resultado = "";

  if (d1 === d2) {
    puntosJugador += d1;
    resultado = `🎉 ¡Doble ${d1}! Sumaste ${d1} puntos.`;
  } else {
    resultado = "No sumaste puntos. Turno de la computadora...";
  }

  // Computadora tira después del jugador
  setTimeout(() => {
    const c1 = Math.floor(Math.random() * 6) + 1;
    const c2 = Math.floor(Math.random() * 6) + 1;

    if (c1 === c2) {
      puntosComputadora += c1;
      resultado += ` La computadora sacó doble ${c1} y sumó ${c1} puntos.`;
    } else {
      resultado += " La computadora tampoco sumó puntos.";
    }

    actualizarPuntajes(resultado);
  }, 800);
}

// --- Actualizar puntajes y verificar si termina el juego ---
function actualizarPuntajes(texto) {
  puntosJugadorEl.textContent = puntosJugador;
  puntosComputadoraEl.textContent = puntosComputadora;
  mensaje.textContent = `Ronda ${ronda}: ${texto}`;

  if (ronda >= rondasMaximas) {
    finalizarJuego();
  } else {
    ronda++;
  }
}

// --- Finalizar el juego ---
function finalizarJuego() {
  btnTirar.disabled = true;
  btnTirar.style.backgroundColor = "gray";

  let resultadoFinal = "";
  if (puntosJugador > puntosComputadora) {
    resultadoFinal = "🏆 ¡Ganaste el juego!";
  } else if (puntosJugador < puntosComputadora) {
    resultadoFinal = "💻 La computadora gana esta vez.";
  } else {
    resultadoFinal = "🤝 ¡Empate!";
  }

  mensaje.textContent = `${resultadoFinal} Puntaje final: Tú ${puntosJugador} - ${puntosComputadora}`;
}

// --- Reiniciar el juego ---
function reiniciarJuego() {
  puntosJugador = 0;
  puntosComputadora = 0;
  ronda = 1;
  puntosJugadorEl.textContent = 0;
  puntosComputadoraEl.textContent = 0;
  mensaje.textContent = "¡Buena suerte!";
  dado1.textContent = "⚀";
  dado2.textContent = "⚀";
  btnTirar.disabled = false;
  btnTirar.style.backgroundColor = "";
}

// --- Eventos ---
btnTirar.addEventListener("click", tirarDados);
btnReset.addEventListener("click", reiniciarJuego);
