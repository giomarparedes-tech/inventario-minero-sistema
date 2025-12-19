import React from 'react';
import PropTypes from 'prop-types';

const MiningMenu = ({ 
  isOpen, 
  onClose, 
  isDark, 
  onThemeToggle,
  menuItems = []
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`
          fixed top-16 md:top-18 right-0
          w-64 max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4.5rem)]
          overflow-y-auto
          ${isDark ? 'bg-gray-900/95' : 'bg-white/95'}
          backdrop-blur-md
          border-l-2 border-yellow-400
          shadow-2xl
          z-50
          animate-slide-in-right
        `}
        role="dialog"
        aria-label="Menú principal"
      >
        <div className="p-4">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className={`
              w-full
              flex items-center justify-between
              px-4 py-3
              rounded-lg
              ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-400
            `}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isDark ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
            </span>
            <div
              className={`
                relative w-12 h-6 rounded-full
                ${isDark ? 'bg-blue-600' : 'bg-gray-300'}
                transition-colors
              `}
            >
              <div
                className={`
                  absolute top-1 left-1
                  w-4 h-4
                  bg-white rounded-full
                  transition-transform
                  ${isDark ? 'translate-x-6' : 'translate-x-0'}
                `}
              />
            </div>
          </button>

          {/* Divider */}
          <div className={`my-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />

          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick?.();
                  onClose();
                }}
                className={`
                  flex items-center gap-3
                  px-4 py-3
                  rounded-lg
                  ${isDark ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                `}
              >
                {item.icon && <span className="text-xl">{item.icon}</span>}
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

MiningMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  onThemeToggle: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default MiningMenu;
