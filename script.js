let model;

async function loadModel() {
    const response = await fetch('model.json');
    model = await response.json();
}

async function predict() {
    if (!model) {
        await loadModel();
    }

    const length = document.getElementById('length');
    const height = document.getElementById('height');
    const width = document.getElementById('width');

    if (!length || !height || !width) {
        console.error('One or more elements not found');
        return;
    }

    const lengthValue = parseFloat(length.value);
    const heightValue = parseFloat(height.value);
    const widthValue = parseFloat(width.value);

    if (isNaN(lengthValue) || isNaN(heightValue) || isNaN(widthValue)) {
        document.getElementById('result').innerText = 'Please enter valid data for all fields';
        document.getElementById('result').classList.remove('d-none');
        return;
    }

    const prediction = lengthValue * model.coefficients[0] + heightValue * model.coefficients[1] + widthValue * model.coefficients[2] + model.intercept;

    if (prediction < 0) {
        document.getElementById('result').innerText = 'Prediction error: Weight cannot be negative';
    } else {
        document.getElementById('result').innerText = `Predicted Weight: ${prediction.toFixed(2)} g`;
    }

    document.getElementById('result').classList.remove('d-none');
}

window.onload = loadModel;
