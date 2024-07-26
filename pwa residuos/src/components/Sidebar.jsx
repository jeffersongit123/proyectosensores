// src/components/Sidebar.js
import React, { useState } from 'react';
import TrashPrediction from './TrashPrediction';
import Report from './Report';
import History from './History'; // Importa el nuevo componente History
import '../Style/style.css';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const showPredictionPanel = () => {
    setActivePanel('prediction');
    if (!showSidebar) {
      setShowSidebar(true); // Abre el sidebar solo si está cerrado
    }
  };

  const showReportPanel = () => {
    setActivePanel('report');
    if (!showSidebar) {
      setShowSidebar(true); // Abre el sidebar solo si está cerrado
    }
  };

  const showHistoryPanel = () => {
    setActivePanel('history');
    if (!showSidebar) {
      setShowSidebar(true); // Abre el sidebar solo si está cerrado
    }
  };

  const closeActivePanel = () => {
    setActivePanel(null);
  };

  return (
    <>
      {/* Botón de menú hamburguesa para alternar el sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-2 left-2 z-50 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg dark:bg-gray-800 dark:text-white"
      >
        <svg
          className="w-6 h-6 text-gray-700 dark:text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={showSidebar ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      {showSidebar && (
        <aside
          id="sidebar-multi-level-sidebar"
          className="fixed top-0 left-0 z-40 w-80 h-screen transition-transform bg-gray-50 dark:bg-gray-800"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto flex flex-col items-center">
            <a href="#" className="flex flex-col items-center mb-5">
              <img src="https://cdn-icons-png.flaticon.com/512/1833/1833783.png" className="h-10 mb-3" alt="Flowbite Logo" />
              <span className="text-xl font-semibold whitespace-nowrap dark:text-white">PWA-GESTION DE RESIDUOS</span>
            </a>
            
            <ul className="space-y-2 font-medium w-full">
              <li>
                <a
                  href="#"
                  onClick={showPredictionPanel}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3">Predicción</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={showReportPanel}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M3 3v18h18v-2H5V3H3zm4 14h2v-4H7v4zm4 0h2V7h-2v10zm4 0h2v-6h-2v6zm4 0h2v-8h-2v8z" />
                  </svg>
                  <span className="flex-1 ms-3">Reporte</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={showHistoryPanel} // Añade el nuevo método de manejo aquí
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.4V5z" />
                  </svg>
                  <span className="flex-1 ms-3">Historial</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      )}

      {/* Panel activo (Predicción, Reporte o Historial) */}
      {(activePanel === 'prediction' || activePanel === 'report' || activePanel === 'history') && (
        <div className="flex justify-center items-center fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
          <div className="w-full max-w-lg p-4 bg-red rounded-lg shadow-lg dark:bg-gray-800">

            {activePanel === 'prediction' && <TrashPrediction />}
            {activePanel === 'report' && <Report />}
            {activePanel === 'history' && <History />} {/* Añade el nuevo componente aquí */}
            <button
              className="absolute top-4 right-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={closeActivePanel}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

