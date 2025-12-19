import React from 'react';
import GlassHeader from './GlassHeader';
import { ThemeProvider } from '../contexts/ThemeContext';

export default {
  title: 'Components/GlassHeader',
  component: GlassHeader,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Story />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Glassmorphism Header Demo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Scroll para ver el efecto sticky. Prueba el toggle de tema y los menús desplegables.
            </p>
            <div className="space-y-4">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Sección {i + 1}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Contenido de ejemplo para demostrar el scroll y el efecto glassmorphism del header.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  args: {},
};

export const LightMode = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.remove('dark');
      }, []);
      return <Story />;
    },
  ],
};

export const DarkMode = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.documentElement.classList.add('dark');
      }, []);
      return <Story />;
    },
  ],
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
