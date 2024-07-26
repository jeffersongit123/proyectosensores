import { database } from '../firebase';
import { ref, get } from 'firebase/database';

const getAllPredictions = async () => {
  const predictionsRef = ref(database, 'predictions');

  try {
    const snapshot = await get(predictionsRef);
    const data = snapshot.val();

    console.log('All data from Firebase:', data); // Verifica los datos crudos

    return data ? Object.values(data) : [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export { getAllPredictions };







