import { useState } from 'react';
import { DashboardGrid } from './components/DashboardGrid';
import { Moon, Sun } from 'phosphor-react';
import './App-Dashboard.css';

function AppDashboard() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dashboard-theme') || 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('dashboard-theme', newTheme);
  };

  const handleCardClick = (card) => {
    console.log('Card clicked:', card);
    // Aquí puedes agregar la navegación o acción correspondiente
    alert(`Navegando a: ${card.title}`);
  };

  return (
    <div className={`app-dashboard ${theme}`}>
      <header className="dashboard-header">
        <div className="header-content">
          <h1>📦 Inventario Minero</h1>
          <p>Dashboard interactivo con drag & drop</p>
        </div>
        
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        >
          {theme === 'dark' ? <Sun size={24} weight="duotone" /> : <Moon size={24} weight="duotone" />}
        </button>
      </header>

      <DashboardGrid 
        theme={theme} 
        onCardClick={handleCardClick}
        storageKey="inventario-dashboard-order"
      />

      <footer className="dashboard-footer">
        <p>💡 Arrastra las tarjetas para reorganizar el dashboard</p>
      </footer>
    </div>
  );
}

export default AppDashboard;
