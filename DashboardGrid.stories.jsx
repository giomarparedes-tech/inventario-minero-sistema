import { DashboardGrid } from './DashboardGrid';

export default {
  title: 'Dashboard/DashboardGrid',
  component: DashboardGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dashboard drag-and-drop con glassmorphism, persistencia en localStorage y responsive design 4-2-1 columnas.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Tema del dashboard',
    },
    onCardClick: {
      action: 'card-clicked',
      description: 'Callback cuando se hace clic en una tarjeta',
    },
  },
};

export const DarkTheme = {
  args: {
    theme: 'dark',
  },
};

export const LightTheme = {
  args: {
    theme: 'light',
  },
};

export const WithCustomCards = {
  args: {
    theme: 'dark',
    initialCards: [
      {
        id: 'custom-1',
        title: 'Tarjeta Personalizada 1',
        description: 'Esta es una tarjeta personalizada',
        icon: 'inventory',
        badge: 5,
        badgeColor: 'blue',
      },
      {
        id: 'custom-2',
        title: 'Tarjeta Personalizada 2',
        description: 'Otra tarjeta personalizada',
        icon: 'alerts',
        badge: 10,
        badgeColor: 'red',
      },
      {
        id: 'custom-3',
        title: 'Tarjeta Personalizada 3',
        description: 'Una más para probar',
        icon: 'users',
      },
    ],
  },
};

export const Interactive = {
  args: {
    theme: 'dark',
  },
  play: async ({ canvasElement }) => {
    // Aquí puedes agregar interacciones de prueba
    console.log('Dashboard cargado:', canvasElement);
  },
};
