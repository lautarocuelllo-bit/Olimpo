document.getElementById('gender').addEventListener('change', function () {
    const femaleInputs = document.getElementById('female-inputs');
    if (this.value === 'female') {
        femaleInputs.style.display = 'block';
    } else {
        femaleInputs.style.display = 'none';
    }
});

document.getElementById('bodyFatform').addEventListener('submit', function (e) {
    e.preventDefault();

    const gender = document.getElementById('gender').value;
    const waist = parseFloat(document.getElementById('waist').value);
    const neck = parseFloat(document.getElementById('neck').value);    
    const height = parseFloat(document.getElementById('height').value);
    const hip = gender === 'female' ? parseFloat(document.getElementById('hip').value) : 0;
    
    let bodyFat = 0;

    if (gender === 'male') {
        bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else if (gender === 'female') {
        bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }

    const resultBox = document.getElementById('result');
    if (isNaN(bodyFat) || bodyFat <= 0){
        resultBox.innerText = "Por favor, ingresa valores válidos.";
    } else {
        resultBox.innerText = `Tu porcentaje de grasa corporal estimado es: ${bodyFat.toFixed(2)}%`;
    }
});          