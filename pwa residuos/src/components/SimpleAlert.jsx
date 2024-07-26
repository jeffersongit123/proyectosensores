// src/components/SimpleAlert.jsx
import React from 'react';
import './SimpleAlert.css'; // Importa el archivo CSS para los estilos de la alerta

const SimpleAlert = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`simple-alert simple-alert-${type}`}>
      {message}
    </div>
  );
};

export default SimpleAlert;
