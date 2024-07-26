// src/services/api.js
export const predictTrashLevel = async (peso) => {
    const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ peso })
    });
    const data = await response.json();
    return data.prediccion;
};
