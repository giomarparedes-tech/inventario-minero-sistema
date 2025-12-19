import React from 'react';
import MiningHeader from './MiningHeader';

export default {
  title: 'Components/MiningHeader',
  component: MiningHeader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    alerts: {
      control: { type: 'number', min: 0, max: 150 },
      description: 'Número de alertas a mostrar en el badge',
    },
    isDark: {
      control: 'boolean',
      description: 'Modo oscuro activado',
    },
    onMenuToggle: { action: 'menu toggled' },
    onThemeToggle: { action: 'theme toggled' },
  },
};

// Template base
const Template = (args) => (
  <div className={args.isDark ? 'dark bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
    <MiningHeader {...args} />
    
    {/* Contenido de ejemplo para ver el scroll */}
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-4 ${args.isDark ? 'text-white' : 'text-gray-900'}`}>
        Inventario Minero - Chancado Primario & Pebbles
      </h1>
      <p className={`mb-4 ${args.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Scroll hacia abajo para ver el efecto de sombra del header.
      </p>
      
      {/* Cards de ejemplo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`
              p-6 rounded-lg
              ${args.isDark ? 'bg-gray-800' : 'bg-white'}
              shadow-md
            `}
          >
            <h3 className={`text-lg font-semibold mb-2 ${args.isDark ? 'text-white' : 'text-gray-900'}`}>
              Material {i + 1}
            </h3>
            <p className={args.isDark ? 'text-gray-400' : 'text-gray-600'}>
              Contenido de ejemplo para demostrar el scroll y el header sticky.
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Story: Modo Claro sin alertas
export const LightMode = Template.bind({});
LightMode.args = {
  alerts: 0,
  isDark: false,
};

// Story: Modo Oscuro sin alertas
export const DarkMode = Template.bind({});
DarkMode.args = {
  alerts: 0,
  isDark: true,
};

// Story: Modo Claro con alertas
export const LightWithAlerts = Template.bind({});
LightWithAlerts.args = {
  alerts: 5,
  isDark: false,
};

// Story: Modo Oscuro con alertas
export const DarkWithAlerts = Template.bind({});
DarkWithAlerts.args = {
  alerts: 12,
  isDark: true,
};

// Story: Muchas alertas (99+)
export const ManyAlerts = Template.bind({});
ManyAlerts.args = {
  alerts: 150,
  isDark: false,
};

// Story: Vista móvil
export const Mobile = Template.bind({});
Mobile.args = {
  alerts: 3,
  isDark: false,
};
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};

// Story: Comparación Dark/Light
export const Comparison = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-gray-100">
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900">Modo Claro</h2>
      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-xl">
        <MiningHeader
          alerts={5}
          isDark={false}
          onMenuToggle={() => console.log('Menu toggled')}
          onThemeToggle={() => console.log('Theme toggled')}
        />
        <div className="p-6">
          <p className="text-gray-600">
            Header con fondo blanco translúcido y logo oscuro.
          </p>
        </div>
      </div>
    </div>
    
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900">Modo Oscuro</h2>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
        <MiningHeader
          alerts={5}
          isDark={true}
          onMenuToggle={() => console.log('Menu toggled')}
          onThemeToggle={() => console.log('Theme toggled')}
        />
        <div className="p-6">
          <p className="text-gray-300">
            Header con fondo oscuro translúcido y logo claro.
          </p>
        </div>
      </div>
    </div>
  </div>
);
