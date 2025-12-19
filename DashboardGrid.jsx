import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { DashboardCard } from './DashboardCard';
import './DashboardGrid.css';

const defaultCards = [
  {
    id: 'inventory',
    title: 'Inventario General',
    description: 'Consultar stock de polines y liners con filtros por ubicación y tipo',
    icon: 'inventory',
  },
  {
    id: 'stock-in',
    title: 'Ingreso de Stock',
    description: 'Registrar llegada de nuevos materiales al almacén',
    icon: 'stock-in',
  },
  {
    id: 'consumption',
    title: 'Registro de Consumo',
    description: 'Registrar uso de materiales por equipo y guardia',
    icon: 'consumption',
  },
  {
    id: 'stock-out',
    title: 'Salidas de Material',
    description: 'Transferencias, préstamos y despachos a otras áreas',
    icon: 'stock-out',
  },
  {
    id: 'reports',
    title: 'Reportes & Dashboard',
    description: 'Análisis de consumo y estadísticas de inventario',
    icon: 'reports',
  },
  {
    id: 'alerts',
    title: 'Alertas de Stock',
    description: 'Materiales con stock bajo que requieren reposición',
    icon: 'alerts',
    badge: 2,
    badgeColor: 'red',
  },
  {
    id: 'history',
    title: 'Historial',
    description: 'Registro completo de movimientos de inventario',
    icon: 'history',
  },
  {
    id: 'users',
    title: 'Gestión de Usuarios',
    description: 'Crear, editar y administrar usuarios del sistema',
    icon: 'users',
  },
  {
    id: 'config',
    title: 'Configuración',
    description: 'Importar datos y configuraciones del sistema',
    icon: 'config',
  },
  {
    id: 'profile',
    title: 'Mi Perfil',
    description: 'Cambiar contraseña y configuración personal',
    icon: 'profile',
  },
];

export const DashboardGrid = ({ 
  theme = 'dark', 
  onCardClick,
  initialCards = defaultCards,
  storageKey = 'dashboard-order'
}) => {
  const [cards, setCards] = useState(() => {
    // Load saved order from localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const savedOrder = JSON.parse(saved);
        return savedOrder.map(id => initialCards.find(card => card.id === id)).filter(Boolean);
      } catch (e) {
        return initialCards;
      }
    }
    return initialCards;
  });

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Save order to localStorage
    const order = cards.map(card => card.id);
    localStorage.setItem(storageKey, JSON.stringify(order));
  }, [cards, storageKey]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeCard = cards.find(card => card.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={cards.map(c => c.id)} strategy={rectSortingStrategy}>
        <div className={`dashboard-grid ${theme}`} role="list" aria-label="Dashboard de aplicaciones">
          {cards.map((card) => (
            <DashboardCard
              key={card.id}
              {...card}
              theme={theme}
              onClick={() => onCardClick?.(card)}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeCard ? (
          <DashboardCard {...activeCard} theme={theme} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
