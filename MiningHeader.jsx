import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MiningHeader = ({ 
  alerts = 0, 
  onMenuToggle, 
  onThemeToggle,
  isDark = false 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 
        h-16 md:h-18 
        px-4
        ${isDark ? 'bg-gray-950/80' : 'bg-white/80'}
        backdrop-blur-md
        border-b-2 border-yellow-400
        transition-shadow duration-300
        ${isScrolled ? 'shadow-lg' : ''}
      `}
      style={{
        willChange: 'transform',
        paddingTop: 'env(safe-area-inset-top)'
      }}
      role="banner"
    >
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="https://logonoid.com/images/anglo-american-logo.png"
            alt="Anglo American"
            className={`h-7 ${isDark ? 'brightness-0 invert' : ''}`}
            style={{ height: '28px' }}
          />
        </div>

        {/* Hamburger Button with Alert Badge */}
        <button
          onClick={onMenuToggle}
          className={`
            relative
            w-12 h-12
            flex items-center justify-center
            rounded-lg
            ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-900/10'}
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-400
          `}
          aria-label="Menú principal"
          aria-expanded="false"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          {/* Alert Badge */}
          {alerts > 0 && (
            <span
              className="
                absolute -top-1 -right-1
                min-w-[20px] h-5
                px-1.5
                flex items-center justify-center
                bg-red-500
                text-white text-xs font-semibold
                rounded-full
                shadow-md
              "
              aria-label={`${alerts} alertas`}
            >
              {alerts > 99 ? '99+' : alerts}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

MiningHeader.propTypes = {
  alerts: PropTypes.number,
  onMenuToggle: PropTypes.func.isRequired,
  onThemeToggle: PropTypes.func.isRequired,
  isDark: PropTypes.bool
};

export default MiningHeader;
