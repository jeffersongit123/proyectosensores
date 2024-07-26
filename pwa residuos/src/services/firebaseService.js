// src/services/firebaseService.js
import { database } from '../firebase'; // Importa la instancia de la base de datos
import { ref, onValue } from 'firebase/database';

// Función para obtener datos del peso en tiempo real
export const getWeightData = (callback) => {
  // Ruta a tus datos en Firebase
  const pesoRef = ref(database, 'contenedores/1/peso');
  
  // Suscríbete a los cambios en la referencia
  const unsubscribe = onValue(pesoRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });

  // Retorna una función de limpieza para desuscribirse si es necesario
  return unsubscribe;
};
