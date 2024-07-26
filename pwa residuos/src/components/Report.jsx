import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getAllPredictions } from '../services/firestoreService';
import '../Style/stylereport.css'; // Importa el archivo CSS

Chart.register(...registerables);

const Report = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Rebosando',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Medio',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Alto',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Bajo',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const predictions = await getAllPredictions();
        console.log('Predictions:', predictions); // Verifica los datos recibidos
        const weeklyData = processPredictions(predictions);
        console.log('Processed data for chart:', weeklyData); // Verifica los datos procesados
        setChartData(weeklyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processPredictions = (predictions) => {
    const weeks = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
    const counts = {
      'Rebosando': Array(weeks.length).fill(0),
      'Alto': Array(weeks.length).fill(0),
      'Medio': Array(weeks.length).fill(0),
      'Bajo': Array(weeks.length).fill(0),
    };

    const normalizePredictionValue = (value) => {
      switch (value.toLowerCase()) {
        case 'rebosando':
        case 'rebosado':
          return 'Rebosando';
        case 'alto':
          return 'Alto';
        case 'medio':
          return 'Medio';
        case 'bajo':
          return 'Bajo';
        default:
          console.warn('Unexpected prediction value:', value);
          return null;
      }
    };

    predictions.forEach(prediction => {
      console.log('Processing prediction:', prediction);
      const [day, month, year] = prediction.date ? prediction.date.split('/') : [];

      if (day && month && year) {
        const date = new Date(year, month - 1, day);
        const weekIndex = Math.floor((date.getDate() - 1) / 7);

        if (weekIndex >= 0 && weekIndex < weeks.length) {
          const predictionKey = normalizePredictionValue(prediction.prediccion);
          if (predictionKey && counts[predictionKey]) {
            counts[predictionKey][weekIndex] += 1;
          } else {
            console.warn('Invalid prediction key:', predictionKey);
          }
        } else {
          console.warn('Invalid week index:', weekIndex);
        }
      } else {
        console.warn('Invalid date format:', prediction.date);
      }
    });

    return {
      labels: weeks,
      datasets: [
        {
          label: 'Rebosando',
          data: counts['Rebosando'],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Medio',
          data: counts['Medio'],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Alto',
          data: counts['Alto'],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Bajo',
          data: counts['Bajo'],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          }
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
          }
        },
      },
    },
  };

  return (
    <div className="report-container">
      <div className="chart-title">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Frecuencia de Predicciones
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            Semanal
          </dd>
        </dl>
      </div>
      <div className="chart-wrapper">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Report;












