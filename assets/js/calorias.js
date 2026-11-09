// Calculadora de calorías

const FORMULAS_BASAL = {
  // Mifflin-St Jeor (1990)
  mifflin: (sexo, peso, altura, edad) =>
    10 * peso + 6.25 * altura - 5 * edad + (sexo === "hombre" ? 5 : -161),

  // Harris-Benedict (versión original)
  harris: (sexo, peso, altura, edad) =>
    sexo === "hombre"
      ? 66.5 + 13.75 * peso + 5.003 * altura - 6.75 * edad
      : 655.1 + 9.563 * peso + 1.85 * altura - 4.676 * edad,
};

// Ajuste de calorías y proteína (g por kg) de cada etapa
const ETAPAS = [
  { nombre: "Definición", desde: -500, hasta: -250, proteina: [1.8, 2.4] },
  { nombre: "Recomposición", desde: 0, hasta: 0, proteina: [1.6, 2.2] },
  { nombre: "Volumen", desde: 250, hasta: 500, proteina: [1.6, 2.2] },
];

function calcularCalorias() {
  const sexo = valorRadio("sexo");
  const edad = leerNumero("edad", 15, 90, "Edad");
  const peso = leerNumero("peso", 30, 300, "Peso");
  const altura = leerNumero("altura", 120, 230, "Altura");
  const actividad = parseFloat(document.getElementById("actividad").value);
  const formula = document.getElementById("formula").value;

  const basal = FORMULAS_BASAL[formula](sexo, peso, altura, edad);
  const mantenimiento = basal * actividad;

  const redondear = (n) => Math.round(n / 10) * 10;

  const tarjetas = ETAPAS.map((etapa) => {
    const kcal =
      etapa.desde === etapa.hasta
        ? `${fmt(redondear(mantenimiento + etapa.desde))} kcal`
        : `${fmt(redondear(mantenimiento + etapa.desde))} – ${fmt(redondear(mantenimiento + etapa.hasta))} kcal`;
    const [pMin, pMax] = etapa.proteina.map((g) => Math.round(g * peso));
    return `
      <div class="stat">
        <div class="stat-title">${etapa.nombre}</div>
        <div class="stat-value">${kcal}</div>
        <div class="stat-sub">Proteína: ${pMin} – ${pMax} g por día</div>
      </div>`;
  }).join("");

  document.getElementById("resultado").innerHTML = `
    <div class="result-label">Calorías de mantenimiento</div>
    <div class="big-number">${fmt(redondear(mantenimiento))}<small>kcal por día</small></div>
    <p class="note">Metabolismo basal: ${fmt(Math.round(basal))} kcal · Actividad: ×${fmt(actividad, String(actividad).split(".")[1]?.length ?? 0)}</p>
    <div class="stat-row">${tarjetas}</div>
  `;
}

conectarCalculadora("form-calorias", calcularCalorias);
