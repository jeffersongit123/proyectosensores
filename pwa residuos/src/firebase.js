// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';  // Importa el módulo para la base de datos en tiempo real
import { getAnalytics } from 'firebase/analytics';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAosfkyl-eNAOe1tEAxRCwPPBKMxto_33Q",
  authDomain: "proyectosensoresbd.firebaseapp.com",
  databaseURL: "https://proyectosensoresbd-default-rtdb.firebaseio.com",
  projectId: "proyectosensoresbd",
  storageBucket: "proyectosensoresbd.appspot.com",
  messagingSenderId: "1010005547331",
  appId: "1:1010005547331:web:d0b2929fe9f755224937f6",
  measurementId: "G-0C4QLYV87Y"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Exporta la instancia de la base de datos
export { database };
