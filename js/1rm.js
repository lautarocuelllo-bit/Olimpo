document.getElementById('rmForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);
    const resultDiv = document.getElementById('result');

    if (isNaN(weight) || isNaN(reps) || reps <= 0) {
        resultDiv.innerText = 'Por favor, introduce valores válidos.';
        return;
    }

    // Calcular 1RM con la fórmula de Epley
    const oneRM = Math.round(weight * (1 + 0.0333 * reps));

    // Generar tabla de estimaciones hasta 15 repeticiones
    let resultsHTML = `<h2>Tu 1RM estimado: ${oneRM} kg</h2>`;
    resultsHTML += '<h3>Peso estimado para repeticiones:</h3><ul>';
    for (let i = 1; i <= 15; i++) {
        const weightForReps = Math.round(oneRM / (1 + 0.0333 * i));
        resultsHTML += `<li>${i} repeticiones: ${weightForReps} kg</li>`;
    }
    resultsHTML += '</ul>';
    resultDiv.innerHTML = resultsHTML;
});