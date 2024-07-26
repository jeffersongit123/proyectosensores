// src/components/History.js
import React, { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database';
import { database } from '../firebase';
import '../Style/stylehistory.css'; // Importar el archivo de estilos

const History = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'predictions/'));
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          const dataList = Object.keys(fetchedData).map(key => fetchedData[key]);
          setData(dataList);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="history-container">
      <h2>Historial de Predicciones</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index} className="history-item">
            <p><strong>Fecha:</strong> {item.date}</p>
            <p><strong>Hora:</strong> {item.time}</p>
            <p><strong>Peso:</strong> {item.peso}</p>
            <p><strong>Predicción:</strong> {item.prediccion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;


