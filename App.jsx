import React from 'react';
import GlassHeader from './components/GlassHeader';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <GlassHeader />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Bienvenido a Anglo American
          </h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/20 dark:border-gray-700/20"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Card {i + 1}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Contenido de ejemplo con efecto glassmorphism sutil.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
