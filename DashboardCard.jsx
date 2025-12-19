import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Package, 
  PlusCircle, 
  Wrench, 
  TrendUp, 
  Warning, 
  ClockCounterClockwise,
  Users,
  Gear,
  User
} from 'phosphor-react';
import './DashboardCard.css';

const iconMap = {
  'inventory': Package,
  'stock-in': PlusCircle,
  'consumption': Wrench,
  'stock-out': TrendUp,
  'reports': ClockCounterClockwise,
  'alerts': Warning,
  'history': ClockCounterClockwise,
  'users': Users,
  'config': Gear,
  'profile': User
};

export const DashboardCard = ({ 
  id, 
  title, 
  description, 
  icon, 
  badge, 
  badgeColor = 'blue',
  onClick,
  theme = 'dark'
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = iconMap[icon] || Package;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`dashboard-card ${theme} ${isDragging ? 'dragging' : ''}`}
      onClick={onClick}
      {...attributes}
      {...listeners}
      role="button"
      tabIndex={0}
      aria-grabbed={isDragging}
      aria-label={`${title}. ${description}. Arrastrable.`}
    >
      <div className="card-icon-wrapper">
        <Icon size={32} weight="duotone" className="card-icon" />
        {badge && (
          <span className={`card-badge badge-${badgeColor}`} aria-label={`${badge} notificaciones`}>
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      
      <div className="card-drag-indicator" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
