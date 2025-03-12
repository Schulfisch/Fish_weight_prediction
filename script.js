let model;

async function loadModel() {
    const response = await fetch('model.json');
    model = await response.json();
}

async function predict() {
    if (!model) {
        await loadModel();
    }

    const length = parseFloat(document.getElementById('length').value);
    const height = parseFloat(document.getElementById('height').value);
    const width = parseFloat(document.getElementById('width').value);
    const species = document.getElementById('species').value;

    if (isNaN(length) || isNaN(height) || isNaN(width) || !species) {
        document.getElementById('result').innerText = 'Please enter valid data for all fields';
        document.getElementById('result').classList.remove('d-none');
        return;
    }

    const prediction = length * model.coefficients[0] + height * model.coefficients[1] + width * model.coefficients[2] + model.intercept;

    if (prediction < 0) {
        document.getElementById('result').innerText = 'Prediction error: Weight cannot be negative';
    } else {
        document.getElementById('result').innerText = `Predicted Weight: ${prediction.toFixed(2)} g`;
    }

    document.getElementById('result').classList.remove('d-none');
}

window.onload = loadModel;
