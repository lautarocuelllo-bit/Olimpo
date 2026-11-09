document.getElementById('calcularCalorias').addEventListener('submit', function(e) {
    e.preventDefault();
    const sexo = document.getElementById('sexo').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const edad = parseInt(document.getElementById('edad').value);
    const actividad = parseFloat(document.getElementById('actividad').value);

    let bmr;
    if (sexo === 'masculino') {
      bmr = 66.5 + (13.75 * peso) + (5.003 * altura) - (6.75 * edad);
    } else {
      bmr = 655.1 + (9.563 * peso) + (1.850 * altura) - (4.676 * edad);
    }

    const tmb = bmr * actividad;
    const mantenimiento = tmb;
    const volumen = [tmb + 250, tmb + 500];
    const definicion = [tmb - 500, tmb - 250];

    document.getElementById('resultado').innerHTML = `
      <h2>Resultados</h2>
      <p><b>Calorías de Mantenimiento:</b> ${mantenimiento.toFixed(0)} kcal</p>
      <p><b>Volumen:</b> ${volumen[0].toFixed(0)} - ${volumen[1].toFixed(0)} kcal</p>
      <p><b>Definición:</b> ${definicion[0].toFixed(0)} - ${definicion[1].toFixed(0)} kcal</p>
    `;
  });