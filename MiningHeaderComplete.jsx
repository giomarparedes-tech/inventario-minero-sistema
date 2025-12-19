import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MiningHeader from './MiningHeader';
import MiningMenu from './MiningMenu';

const MiningHeaderComplete = ({ 
  alerts = 0,
  initialDark = false,
  menuItems = [
    { label: 'Inicio', icon: '🏠', href: '#inicio' },
    { label: 'Inventario', icon: '📦', href: '#inventario' },
    { label: 'Reportes', icon: '📊', href: '#reportes' },
    { label: 'Mi Perfil', icon: '👤', href: '#perfil' },
    { label: 'Cerrar Sesión', icon: '🚪', href: '#logout' },
  ]
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(initialDark);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    // Aquí puedes agregar lógica adicional para persistir el tema
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <MiningHeader
        alerts={alerts}
        onMenuToggle={handleMenuToggle}
        onThemeToggle={handleThemeToggle}
        isDark={isDark}
      />
      
      <MiningMenu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        menuItems={menuItems}
      />
    </div>
  );
};

MiningHeaderComplete.propTypes = {
  alerts: PropTypes.number,
  initialDark: PropTypes.bool,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default MiningHeaderComplete;
