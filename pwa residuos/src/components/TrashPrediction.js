// src/components/TrashPrediction.js
import React, { useState, useEffect } from 'react';
import { predictTrashLevel } from '../services/api';
import { getWeightData } from '../services/firebaseService';
import { database } from '../firebase';
import { ref, set, push } from 'firebase/database';
import arbolDecision from '../assets/arbol_decision.png';
import '../Style/style.css';

const TrashPrediction = () => {
  const [peso, setPeso] = useState('');
  const [prediccion, setPrediccion] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const unsubscribe = getWeightData((data) => {
      setPeso(data);
      handlePredict(data);
    });

    return () => unsubscribe();
  }, []);

  const handlePredict = async (peso) => {
    const result = await predictTrashLevel(parseFloat(peso));
    setPrediccion(result);

    // Guardar la predicción en Realtime Database
    const predictionRef = ref(database, 'predictions');
    const newPredictionRef = push(predictionRef);

    const now = new Date();
    const date = now.toLocaleDateString('es-ES');
    const time = now.toLocaleTimeString('es-ES');

    set(newPredictionRef, {
      peso,
      prediccion: result,
      date,
      time,
    });

    if (result === 'rebosado') {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-blue-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-900">
        Monitoreo y Predicción del Nivel de Llenado del Contenedor
      </h1>
      <img
        src={arbolDecision}
        alt="Árbol de Decisión"
        className="w-4/5 mx-auto mb-8"
      />
      <div className="mb-8">
        <label
          htmlFor="peso"
          className="block mb-4 text-xl font-bold text-gray-800 text-center"
        >
          Peso en Tiempo Real (kg):
        </label>
        <input
          id="peso"
          type="number"
          value={peso}
          readOnly
          placeholder="Peso en tiempo real"
          className="bg-white border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 text-center"
        />
      </div>
      {showAlert && (
        <div id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Error</span>
          <div className="ms-3 text-sm font-medium">
            El contenedor está <strong>rebosando</strong>. ¡Toma acción inmediatamente!
          </div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" aria-label="Close" onClick={handleCloseAlert}>
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
      {prediccion && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Predicción Nivel: {prediccion}</h2>
        </div>
      )}
    </div>
  );
};

export default TrashPrediction;





