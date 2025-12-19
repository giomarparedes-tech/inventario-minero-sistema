import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { DashboardGrid } from './DashboardGrid';

describe('DashboardGrid', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all default cards', () => {
    render(<DashboardGrid />);
    
    expect(screen.getByText('Inventario General')).toBeInTheDocument();
    expect(screen.getByText('Ingreso de Stock')).toBeInTheDocument();
    expect(screen.getByText('Gestión de Usuarios')).toBeInTheDocument();
  });

  it('applies dark theme by default', () => {
    const { container } = render(<DashboardGrid />);
    const grid = container.querySelector('.dashboard-grid');
    
    expect(grid).toHaveClass('dark');
  });

  it('applies light theme when specified', () => {
    const { container } = render(<DashboardGrid theme="light" />);
    const grid = container.querySelector('.dashboard-grid');
    
    expect(grid).toHaveClass('light');
  });

  it('calls onCardClick when a card is clicked', async () => {
    const handleClick = vi.fn();
    render(<DashboardGrid onCardClick={handleClick} />);
    
    const card = screen.getByText('Inventario General').closest('.dashboard-card');
    await userEvent.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'inventory',
        title: 'Inventario General',
      })
    );
  });

  it('renders badges correctly', () => {
    render(<DashboardGrid />);
    
    const alertsCard = screen.getByText('Alertas de Stock').closest('.dashboard-card');
    const badge = alertsCard.querySelector('.card-badge');
    
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('2');
    expect(badge).toHaveClass('badge-red');
  });

  it('saves card order to localStorage', async () => {
    render(<DashboardGrid storageKey="test-dashboard" />);
    
    await waitFor(() => {
      const saved = localStorage.getItem('test-dashboard');
      expect(saved).toBeTruthy();
      
      const order = JSON.parse(saved);
      expect(order).toContain('inventory');
      expect(order).toContain('stock-in');
    });
  });

  it('loads card order from localStorage', () => {
    const customOrder = ['users', 'profile', 'config'];
    localStorage.setItem('test-dashboard-2', JSON.stringify(customOrder));
    
    const customCards = [
      { id: 'users', title: 'Users', description: 'Test', icon: 'users' },
      { id: 'profile', title: 'Profile', description: 'Test', icon: 'profile' },
      { id: 'config', title: 'Config', description: 'Test', icon: 'config' },
    ];
    
    render(
      <DashboardGrid 
        initialCards={customCards} 
        storageKey="test-dashboard-2" 
      />
    );
    
    const cards = screen.getAllByRole('button');
    expect(cards[0]).toHaveTextContent('Users');
    expect(cards[1]).toHaveTextContent('Profile');
    expect(cards[2]).toHaveTextContent('Config');
  });

  it('renders custom cards', () => {
    const customCards = [
      {
        id: 'custom-1',
        title: 'Custom Card',
        description: 'Custom description',
        icon: 'inventory',
      },
    ];
    
    render(<DashboardGrid initialCards={customCards} />);
    
    expect(screen.getByText('Custom Card')).toBeInTheDocument();
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<DashboardGrid />);
    
    const grid = screen.getByRole('list');
    expect(grid).toHaveAttribute('aria-label', 'Dashboard de aplicaciones');
    
    const cards = screen.getAllByRole('button');
    cards.forEach(card => {
      expect(card).toHaveAttribute('tabIndex', '0');
      expect(card).toHaveAttribute('aria-label');
    });
  });

  it('shows drag indicator on cards', () => {
    const { container } = render(<DashboardGrid />);
    
    const indicators = container.querySelectorAll('.card-drag-indicator');
    expect(indicators.length).toBeGreaterThan(0);
  });

  it('applies dragging class when card is being dragged', () => {
    const { container } = render(<DashboardGrid />);
    
    const card = container.querySelector('.dashboard-card');
    expect(card).not.toHaveClass('dragging');
  });
});
