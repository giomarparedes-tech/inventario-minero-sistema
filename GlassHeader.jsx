import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const GlassHeader = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Perfil', href: '#perfil' }
  ];

  const profileItems = [
    { label: 'Mi cuenta', href: '#cuenta' },
    { label: 'Configuración', href: '#config' },
    { label: 'Cerrar sesión', href: '#logout' }
  ];

  return (
    <header 
      className="sticky top-0 z-50 h-16 md:h-18 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20"
      role="banner"
    >
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
              aria-label="Anglo American - Inicio"
            >
              <img 
                src="https://logonoid.com/images/anglo-american-logo.png"
                alt="Anglo American"
                className="h-7"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navegación principal">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-900 dark:text-gray-100 no-underline transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-lg text-gray-900 dark:text-gray-100 transition-all hover:opacity-80 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-1 rounded-lg transition-all hover:opacity-80 hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Menú de usuario"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                  AA
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-lg border border-gray-200/20 dark:border-gray-800/20 py-1">
                  {profileItems.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-lg text-gray-900 dark:text-gray-100 transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Menú de navegación"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-2xl z-50 md:hidden border-l border-gray-200/20 dark:border-gray-800/20">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200/20 dark:border-gray-800/20">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Menú</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-900 dark:text-gray-100 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Cerrar menú"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 p-4" aria-label="Navegación móvil">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block py-3 px-4 text-base font-medium text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default GlassHeader;
