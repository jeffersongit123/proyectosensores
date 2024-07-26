#datamodelo/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Añadir esta línea para permitir CORS

# Cargar el modelo entrenado
model = joblib.load('modelo_basura.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    peso = data['peso']
    prediction = model.predict(np.array([[peso]]))
    return jsonify({'prediccion': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)




