// Calculadora de 1RM con 7 fórmulas

const FORMULAS_1RM = [
  { nombre: "Epley", calc: (w, r) => w * (1 + r / 30) },
  { nombre: "Brzycki", calc: (w, r) => (w * 36) / (37 - r) },
  { nombre: "Lombardi", calc: (w, r) => w * Math.pow(r, 0.1) },
  { nombre: "Mayhew", calc: (w, r) => (100 * w) / (52.2 + 41.9 * Math.exp(-0.055 * r)) },
  { nombre: "McGlothin", calc: (w, r) => (100 * w) / (101.3 - 2.67123 * r) },
  { nombre: "O'Conner", calc: (w, r) => w * (1 + 0.025 * r) },
  { nombre: "Wathan", calc: (w, r) => (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r)) },
];

// Redondea al disco más chico habitual (2,5 kg)
const aDiscos = (kg) => Math.round(kg / 2.5) * 2.5;

function calcular1RM() {
  const peso = leerNumero("peso", 1, 500, "Peso");
  const reps = Math.round(leerNumero("reps", 1, 15, "Repeticiones"));

  // Con 1 repetición el 1RM es el mismo peso: no hace falta estimar
  const resultados = FORMULAS_1RM.map((f) => ({
    nombre: f.nombre,
    valor: reps === 1 ? peso : f.calc(peso, reps),
  }));
  const promedio = resultados.reduce((s, r) => s + r.valor, 0) / resultados.length;

  const filasFormulas = resultados
    .map((r) => `<tr><td>${r.nombre}</td><td class="num">${fmt(r.valor, 1)} kg</td></tr>`)
    .join("");

  // Carga para cada cantidad de repeticiones. Usa la curva de Brzycki, (37 − n) / 36,
  // elevada a un exponente que la hace pasar por los dos puntos que conocemos:
  // 1 repetición = el 1RM promedio, y tus repeticiones = el peso que levantaste.
  const brzycki = (n) => (37 - n) / 36;
  const exponente = reps === 1 ? 1 : Math.log(peso / promedio) / Math.log(brzycki(reps));

  const filasCargas = [];
  for (let n = 1; n <= 12; n++) {
    const carga = promedio * Math.pow(brzycki(n), exponente);
    const porcentaje = (carga / promedio) * 100;
    const clase = n === reps ? ' class="is-current"' : "";
    filasCargas.push(
      `<tr${clase}><td>${n}</td><td class="num">${fmt(porcentaje, 0)} %</td><td class="num">${fmt(aDiscos(carga), 1)} kg</td></tr>`
    );
  }

  const aviso =
    reps > 10
      ? '<p class="note">Con más de 10 repeticiones la estimación pierde precisión. Para un número más confiable, probá con una serie de 3 a 6.</p>'
      : "";

  document.getElementById("resultado").innerHTML = `
    <div class="result-label">1RM estimado (promedio)</div>
    <div class="big-number">${fmt(promedio, 1)}<small>kg</small></div>
    ${aviso}

    <h3 style="margin-top:24px">Cargas por repeticiones</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Reps</th><th class="num">% del 1RM</th><th class="num">Peso</th></tr></thead>
        <tbody>${filasCargas.join("")}</tbody>
      </table>
    </div>
    <p class="note">Pesos redondeados de a 2,5 kg.</p>

    <h3 style="margin-top:24px">Según cada fórmula</h3>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Fórmula</th><th class="num">1RM</th></tr></thead>
        <tbody>${filasFormulas}</tbody>
      </table>
    </div>
  `;
}

conectarCalculadora("form-1rm", calcular1RM);
