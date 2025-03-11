let model;

async function loadModel() {
    const response = await fetch('model.json');
    model = await response.json();
}

async function predict() {
    if (!model) {
        await loadModel();
    }

    const feature1 = parseFloat(document.getElementById('feature1').value);
    const feature2 = parseFloat(document.getElementById('feature2').value);

    if (isNaN(feature1) || isNaN(feature2)) {
        document.getElementById('result').innerText = 'Please enter valid numbers for all features';
        return;
    }

    const prediction = feature1 * model.coefficients[0] + feature2 * model.coefficients[1] + model.intercept;

    document.getElementById('result').innerText = `Predicted Weight: ${prediction.toFixed(2)}`;
}

window.onload = loadModel;
