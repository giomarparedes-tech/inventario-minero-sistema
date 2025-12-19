import React, { useState, useEffect } from 'react';
import MiningHeaderComplete from './components/MiningHeaderComplete';
import './components/MiningHeader.css';

function App() {
  const [alerts, setAlerts] = useState(0);

  // Simular alertas dinámicas
  useEffect(() => {
    // Cargar alertas del inventario
    const checkAlerts = () => {
      try {
        const inventario = JSON.parse(localStorage.getItem('inventario') || '[]');
        const lowStockItems = inventario.filter(item => item.cantidad < 5);
        setAlerts(lowStockItems.length);
      } catch (e) {
        setAlerts(0);
      }
    };

    checkAlerts();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(checkAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Items del menú personalizados
  const menuItems = [
    {
      label: 'Inicio',
      icon: '🏠',
      href: '#inicio',
      onClick: () => {
        console.log('Navegando a Inicio');
        // Aquí puedes agregar tu lógica de navegación
      }
    },
    {
      label: 'Inventario General',
      icon: '📦',
      href: '#inventario',
      onClick: () => {
        console.log('Navegando a Inventario');
      }
    },
    {
      label: 'Ingreso de Stock',
      icon: '➕',
      href: '#ingreso',
      onClick: () => {
        console.log('Navegando a Ingreso');
      }
    },
    {
      label: 'Reportes & Dashboard',
      icon: '📊',
      href: '#reportes',
      onClick: () => {
        console.log('Navegando a Reportes');
      }
    },
    {
      label: 'Alertas de Stock',
      icon: '⚠️',
      href: '#alertas',
      onClick: () => {
        console.log('Navegando a Alertas');
      }
    },
    {
      label: 'Mi Perfil',
      icon: '👤',
      href: '#perfil',
      onClick: () => {
        console.log('Navegando a Perfil');
      }
    },
    {
      label: 'Cerrar Sesión',
      icon: '🚪',
      href: '#logout',
      onClick: () => {
        if (confirm('¿Está seguro de que desea cerrar sesión?')) {
          console.log('Cerrando sesión...');
          // Aquí puedes agregar tu lógica de logout
          localStorage.removeItem('currentUser');
          window.location.href = '/';
        }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <MiningHeaderComplete
        alerts={alerts}
        initialDark={localStorage.getItem('theme') === 'dark'}
        menuItems={menuItems}
      />

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Inventario Minero - Chancado Primario & Pebbles
        </h1>

        {/* Alertas */}
        {alerts > 0 && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200">
                  Alertas de Stock Bajo
                </h3>
                <p className="text-red-600 dark:text-red-300">
                  Hay {alerts} {alerts === 1 ? 'material' : 'materiales'} con stock bajo (menos de 5 unidades)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cards de ejemplo */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Inventario Total', value: '1,234', icon: '📦', color: 'blue' },
            { title: 'Ingresos Hoy', value: '45', icon: '➕', color: 'green' },
            { title: 'Salidas Hoy', value: '23', icon: '📤', color: 'orange' },
            { title: 'Stock Bajo', value: alerts, icon: '⚠️', color: 'red' },
            { title: 'Materiales', value: '156', icon: '🔧', color: 'purple' },
            { title: 'Usuarios Activos', value: '8', icon: '👥', color: 'indigo' },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{card.icon}</span>
                <span className={`text-3xl font-bold text-${card.color}-600 dark:text-${card.color}-400`}>
                  {card.value}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {card.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Contenido adicional para scroll */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Últimos Movimientos
          </h2>
          
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Material #{i + 1}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Movimiento de ejemplo - {new Date().toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  Completado
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
