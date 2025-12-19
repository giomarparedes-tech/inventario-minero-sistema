# 🏗️ Mining Header Component

Header React + Tailwind limpio y funcional para aplicativo web y móvil de Inventario Minero.

## 📋 Especificaciones

### Estructura
- ✅ Contenedor sticky `top-0 z-50`
- ✅ Altura: `h-16` (móvil) / `h-18` (desktop)
- ✅ Padding: `px-4`
- ✅ Backdrop blur: `backdrop-blur-md`

### Fondo
- ✅ Dark: `bg-gray-950/80`
- ✅ Light: `bg-white/80`
- ✅ Border: `border-b-2 border-yellow-400`

### Logo
- ✅ SVG Anglo American
- ✅ 28px altura
- ✅ Blanco (dark) / Negro (light)
- ✅ Posición: izquierda

### Botón Hamburguesa
- ✅ Tamaño: 48×48 px
- ✅ Posición: derecha
- ✅ Badge rojo para alertas
- ✅ Muestra "99+" si alertas > 99

### Comportamiento
- ✅ `position: sticky`
- ✅ `will-change: transform`
- ✅ `safe-area-inset-top`
- ✅ Sombra tras scroll > 10px
- ✅ Clicks sin bloqueo en móvil
- ✅ Z-index capas limpias

### Accesibilidad
- ✅ `aria-label` en todos los elementos
- ✅ `focus:ring-2 focus:ring-blue-400`
- ✅ Contraste WCAG AAA
- ✅ Navegación por teclado

## 🚀 Uso

### Componente Básico

```jsx
import MiningHeader from './components/MiningHeader';

function App() {
  return (
    <MiningHeader
      alerts={5}
      isDark={false}
      onMenuToggle={() => console.log('Menu toggled')}
      onThemeToggle={() => console.log('Theme toggled')}
    />
  );
}
```

### Componente Completo (con menú)

```jsx
import MiningHeaderComplete from './components/MiningHeaderComplete';

function App() {
  return (
    <MiningHeaderComplete
      alerts={3}
      initialDark={false}
      menuItems={[
        { label: 'Inicio', icon: '🏠', href: '#inicio' },
        { label: 'Inventario', icon: '📦', href: '#inventario' },
        { label: 'Reportes', icon: '📊', href: '#reportes' },
        { label: 'Mi Perfil', icon: '👤', href: '#perfil' },
        { label: 'Cerrar Sesión', icon: '🚪', href: '#logout' },
      ]}
    />
  );
}
```

## 📦 Props

### MiningHeader

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `alerts` | `number` | `0` | Número de alertas a mostrar |
| `isDark` | `boolean` | `false` | Modo oscuro activado |
| `onMenuToggle` | `function` | required | Callback al abrir menú |
| `onThemeToggle` | `function` | required | Callback al cambiar tema |

### MiningHeaderComplete

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `alerts` | `number` | `0` | Número de alertas a mostrar |
| `initialDark` | `boolean` | `false` | Tema inicial |
| `menuItems` | `array` | `[...]` | Items del menú |

### MenuItem Object

```typescript
{
  label: string;      // Texto del item
  icon?: string;      // Emoji o icono
  href?: string;      // URL del enlace
  onClick?: function; // Callback al hacer click
}
```

## 🎨 Storybook

### Ejecutar Storybook

```bash
npm run storybook
```

### Stories Disponibles

- **Light Mode** - Header en modo claro sin alertas
- **Dark Mode** - Header en modo oscuro sin alertas
- **Light With Alerts** - Header claro con 5 alertas
- **Dark With Alerts** - Header oscuro con 12 alertas
- **Many Alerts** - Header con 150 alertas (muestra 99+)
- **Mobile** - Vista móvil
- **Comparison** - Comparación lado a lado

## 🎯 Características

### Glassmorphism
- Fondo translúcido (80% opacidad)
- Backdrop blur para efecto vidrio
- Border amarillo seguridad

### Responsive
- **Móvil**: 64px altura, menú hamburguesa
- **Desktop**: 72px altura, mismo diseño
- Breakpoint: 768px (md)

### Performance
- `will-change: transform` para optimización
- `contain: layout style paint` para aislamiento
- Event listeners pasivos
- Animaciones CSS optimizadas

### Accesibilidad
- ARIA labels descriptivos
- Focus ring visible (azul)
- Contraste AAA (4.5:1 mínimo)
- Navegación por teclado completa
- Touch targets ≥48px

## 🔧 Personalización

### Cambiar Colores

```jsx
// En MiningHeader.jsx, modificar las clases:
className={`
  ${isDark ? 'bg-gray-950/80' : 'bg-white/80'}
  border-b-2 border-yellow-400  // Cambiar color aquí
`}
```

### Cambiar Logo

```jsx
<img
  src="TU_LOGO_AQUI.png"
  alt="Tu Empresa"
  className={`h-7 ${isDark ? 'brightness-0 invert' : ''}`}
/>
```

### Agregar Items al Menú

```jsx
<MiningHeaderComplete
  menuItems={[
    { label: 'Inicio', icon: '🏠', href: '#inicio' },
    { label: 'Nuevo Item', icon: '⭐', href: '#nuevo' },
    // ... más items
  ]}
/>
```

## 📱 Responsive Breakpoints

| Breakpoint | Clase | Ancho | Cambios |
|------------|-------|-------|---------|
| Mobile | - | < 768px | h-16 (64px) |
| Desktop | md: | ≥ 768px | h-18 (72px) |

## 🎨 Temas

### Modo Claro
- Fondo: `bg-white/80` (blanco 80%)
- Texto: `text-gray-900` (negro)
- Logo: Normal
- Hover: `hover:bg-gray-900/10`

### Modo Oscuro
- Fondo: `bg-gray-950/80` (casi negro 80%)
- Texto: `text-white` (blanco)
- Logo: Invertido (blanco)
- Hover: `hover:bg-white/10`

## 🔍 Testing

### Verificar Accesibilidad

```bash
# Lighthouse
npm run lighthouse

# axe DevTools
# Instalar extensión en Chrome/Firefox
```

### Verificar Responsive

```bash
# Chrome DevTools
# F12 → Toggle device toolbar (Ctrl+Shift+M)
```

## 📊 Performance

### Métricas Objetivo
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Cumulative Layout Shift: < 0.1

### Optimizaciones Aplicadas
- ✅ Lazy loading de menú
- ✅ CSS contain para aislamiento
- ✅ Event listeners pasivos
- ✅ Will-change para animaciones
- ✅ Backdrop-filter con fallback

## 🐛 Troubleshooting

### El header no es sticky

Verifica que el contenedor padre no tenga `overflow: hidden`:

```css
/* Evitar esto en el padre */
.parent {
  overflow: hidden; /* ❌ Rompe sticky */
}
```

### El blur no funciona

Algunos navegadores antiguos no soportan `backdrop-filter`. Agregar fallback:

```jsx
className="backdrop-blur-md bg-white/90" // Aumentar opacidad
```

### Las alertas no se ven

Verifica que el número sea > 0:

```jsx
<MiningHeader alerts={5} /> // ✅ Se ve
<MiningHeader alerts={0} /> // ❌ No se ve
```

## 📚 Archivos

```
src/components/
├── MiningHeader.jsx           # Componente principal
├── MiningHeader.stories.jsx   # Stories de Storybook
├── MiningHeader.css          # Estilos y animaciones
├── MiningMenu.jsx            # Menú desplegable
├── MiningHeaderComplete.jsx  # Componente completo
└── README-MINING-HEADER.md   # Esta documentación
```

## ✅ Checklist de Implementación

- [x] Estructura sticky con z-index correcto
- [x] Fondo glassmorphism (blur + opacidad)
- [x] Border amarillo seguridad
- [x] Logo 28px responsive
- [x] Botón hamburguesa 48×48px
- [x] Badge de alertas con pill rojo
- [x] Toggle light/dark en menú
- [x] Sombra tras scroll > 10px
- [x] Safe area inset para notch
- [x] Clicks sin bloqueo en móvil
- [x] ARIA labels completos
- [x] Focus ring visible
- [x] Contraste WCAG AAA
- [x] Storybook con variantes
- [x] Props documentados
- [x] Código limpio y comentado

## 🎉 Resultado

Un header limpio, funcional y accesible que cumple con todas las especificaciones:

- ✅ Glassmorphism con border amarillo
- ✅ Responsive (móvil y desktop)
- ✅ Alertas con badge rojo
- ✅ Toggle tema integrado
- ✅ Accesibilidad AAA
- ✅ Performance optimizado
- ✅ Código limpio y mantenible

¡Listo para usar en producción! 🚀
