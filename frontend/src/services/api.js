async function getPrediction(formdata) {
    const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: JSON.stringify(formdata)
    });
    return response.json();
}

export default getPrediction;