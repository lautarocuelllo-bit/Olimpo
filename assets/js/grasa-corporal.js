// Calculadora de grasa corporal (método de la Marina de EE. UU., medidas en cm)

// Rangos de referencia del American Council on Exercise
const RANGOS = {
  hombre: [
    { nombre: "Grasa esencial", hasta: 6 },
    { nombre: "Atleta", hasta: 14 },
    { nombre: "Fitness", hasta: 18 },
    { nombre: "Promedio", hasta: 25 },
    { nombre: "Por encima del promedio", hasta: Infinity },
  ],
  mujer: [
    { nombre: "Grasa esencial", hasta: 14 },
    { nombre: "Atleta", hasta: 21 },
    { nombre: "Fitness", hasta: 25 },
    { nombre: "Promedio", hasta: 32 },
    { nombre: "Por encima del promedio", hasta: Infinity },
  ],
};

const campoCadera = document.getElementById("campo-cadera");
const hintCintura = document.getElementById("hint-cintura");

document.querySelectorAll('input[name="sexo"]').forEach((radio) =>
  radio.addEventListener("change", () => {
    const esMujer = valorRadio("sexo") === "mujer";
    campoCadera.hidden = !esMujer;
    hintCintura.textContent = esMujer
      ? "En la parte más angosta"
      : "A la altura del ombligo";
  })
);

function porcentajeGrasa(sexo, altura, cuello, cintura, cadera) {
  if (sexo === "hombre") {
    return 495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(altura)) - 450;
  }
  return 495 / (1.29579 - 0.35004 * Math.log10(cintura + cadera - cuello) + 0.221 * Math.log10(altura)) - 450;
}

function calcularGrasa() {
  const sexo = valorRadio("sexo");
  const altura = leerNumero("altura", 120, 230, "Altura");
  const cuello = leerNumero("cuello", 20, 70, "Cuello");
  const cintura = leerNumero("cintura", 40, 200, "Cintura");
  const cadera = sexo === "mujer" ? leerNumero("cadera", 50, 200, "Cadera") : 0;

  if (cintura <= cuello) {
    throw new ErrorDeCampo("La cintura tiene que ser mayor que el cuello. Revisá las medidas.");
  }

  const grasa = porcentajeGrasa(sexo, altura, cuello, cintura, cadera);
  if (!Number.isFinite(grasa) || grasa < 2 || grasa > 70) {
    throw new ErrorDeCampo("Con esas medidas el resultado no es realista. Revisá que estén en centímetros.");
  }

  const rangos = RANGOS[sexo];
  const actual = rangos.find((r) => grasa < r.hasta);

  let desde = sexo === "hombre" ? 2 : 10;
  const filas = rangos
    .map((r) => {
      const texto = r.hasta === Infinity ? `${desde} % o más` : `${desde} – ${r.hasta - 1} %`;
      desde = r.hasta;
      const clase = r === actual ? ' class="is-current"' : "";
      return `<tr${clase}><td>${r.nombre}</td><td class="num">${texto}</td></tr>`;
    })
    .join("");

  document.getElementById("resultado").innerHTML = `
    <div class="result-label">Grasa corporal estimada</div>
    <div class="big-number">${fmt(grasa, 1)}<small>%</small></div>
    <p class="note">Estás en el rango <strong class="accent">${actual.nombre.toLowerCase()}</strong>.</p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Rango</th><th class="num">${sexo === "hombre" ? "Hombres" : "Mujeres"}</th></tr></thead>
        <tbody>${filas}</tbody>
      </table>
    </div>
  `;
}

conectarCalculadora("form-grasa", calcularGrasa);
