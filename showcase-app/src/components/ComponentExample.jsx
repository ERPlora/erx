import { useRef, useEffect } from 'react';

// Import detailed examples
import CartExample from './examples/CartExample';
import RatingExample from './examples/RatingExample';
import ProductCardExample from './examples/ProductCardExample';
import StatsExample from './examples/StatsExample';
import DataGridExample from './examples/DataGridExample';
import TimelineExample from './examples/TimelineExample';
import KanbanExample from './examples/KanbanExample';
import CalendarExample from './examples/CalendarExample';
import ProgressStepsExample from './examples/ProgressStepsExample';
import PaymentExample from './examples/PaymentExample';
import StockIndicatorExample from './examples/StockIndicatorExample';

const detailedExamples = {
  'erx-cart': CartExample,
  'erx-rating': RatingExample,
  'erx-product-card': ProductCardExample,
  'erx-stats': StatsExample,
  'erx-data-grid': DataGridExample,
  'erx-timeline': TimelineExample,
  'erx-kanban': KanbanExample,
  'erx-calendar': CalendarExample,
  'erx-progress-steps': ProgressStepsExample,
  'erx-payment': PaymentExample,
  'erx-stock-indicator': StockIndicatorExample,
};

// Generic component renderer with default props
function GenericExample({ componentName }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the component element
    const element = document.createElement(componentName);
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(element);

    switch (componentName) {
      // POS & Retail
      case 'erx-stock-indicator':
        element.setAttribute('stock', '45');
        element.setAttribute('min-stock', '10');
        break;
      case 'erx-payment':
        element.setAttribute('total', '127.50');
        element.setAttribute('currency', '€');
        break;
      case 'erx-receipt':
        element.setAttribute('order-id', 'ORD-2024-001');
        element.setAttribute('total', '127.50');
        break;
      case 'erx-pin-pad':
        element.setAttribute('length', '4');
        break;
      case 'erx-variant-selector':
        element.variants = [
          { id: '1', name: 'Small', available: true },
          { id: '2', name: 'Medium', available: true },
          { id: '3', name: 'Large', available: false },
        ];
        break;
      case 'erx-category-tabs':
        element.categories = [
          { id: '1', name: 'Electronics', icon: 'laptop' },
          { id: '2', name: 'Clothing', icon: 'shirt' },
          { id: '3', name: 'Food', icon: 'restaurant' },
        ];
        break;

      // Data Display
      case 'erx-stats':
        element.stats = [
          { label: 'Revenue', value: '€127,450', trend: 'up', change: '+12.5%' },
          { label: 'Orders', value: '1,284', trend: 'up', change: '+8.2%' },
          { label: 'Customers', value: '892', trend: 'down', change: '-2.1%' },
        ];
        break;
      case 'erx-metric-card':
        element.setAttribute('title', 'Total Sales');
        element.setAttribute('value', '€45,231');
        element.setAttribute('trend', 'up');
        element.setAttribute('change', '+12.5%');
        break;
      case 'erx-progress-steps':
        element.steps = [
          { label: 'Order Placed', completed: true },
          { label: 'Processing', completed: true },
          { label: 'Shipped', completed: false },
          { label: 'Delivered', completed: false },
        ];
        element.setAttribute('current', '2');
        break;
      case 'erx-timeline':
        element.events = [
          { time: '10:30', title: 'Order Created', description: 'New order received' },
          { time: '11:45', title: 'Payment Confirmed', description: 'Payment processed' },
          { time: '14:20', title: 'Shipped', description: 'Order dispatched' },
        ];
        break;
      case 'erx-pagination':
        element.setAttribute('total', '100');
        element.setAttribute('page-size', '10');
        element.setAttribute('current-page', '1');
        break;

      // Charts & Visualization
      case 'erx-sparkline':
        element.data = [12, 19, 15, 25, 22, 30, 28, 35, 32, 38];
        break;
      case 'erx-gauge':
        element.setAttribute('value', '75');
        element.setAttribute('min', '0');
        element.setAttribute('max', '100');
        element.setAttribute('label', 'Performance');
        break;
      case 'erx-progress-circle':
        element.setAttribute('value', '65');
        element.setAttribute('max', '100');
        break;

      // UI Components
      case 'erx-status-indicator':
        element.setAttribute('status', 'active');
        element.setAttribute('label', 'Online');
        break;
      case 'erx-quantity-badge':
        element.setAttribute('count', '8');
        break;
      case 'erx-banner':
        element.setAttribute('message', 'System maintenance scheduled for tonight at 2 AM');
        element.setAttribute('type', 'info');
        break;
      case 'erx-callout':
        element.setAttribute('title', 'Important Notice');
        element.setAttribute('type', 'warning');
        element.textContent = 'Please review your account settings before proceeding.';
        break;
      case 'erx-divider':
        element.setAttribute('text', 'OR');
        break;

      // Forms & Input
      case 'erx-tag-input':
        element.tags = ['React', 'TypeScript', 'Stencil'];
        break;
      case 'erx-currency-input':
        element.setAttribute('value', '1250.50');
        element.setAttribute('currency', '€');
        break;
      case 'erx-date-range-picker':
        element.setAttribute('start-date', '2024-01-01');
        element.setAttribute('end-date', '2024-01-31');
        break;
      case 'erx-color-picker':
        element.setAttribute('value', '#667eea');
        break;
      case 'erx-autocomplete':
        element.items = [
          'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
          'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
        ];
        break;

      // Layout
      case 'erx-panel':
        element.setAttribute('title', 'Settings Panel');
        element.innerHTML = '<p style="padding: 16px;">Panel content goes here</p>';
        break;
      case 'erx-section':
        element.setAttribute('title', 'User Information');
        element.innerHTML = '<p style="padding: 16px;">Section content</p>';
        break;

      // HR & Workforce
      case 'erx-time-clock':
        element.setAttribute('employee-name', 'John Doe');
        break;
      case 'erx-performance-meter':
        element.setAttribute('score', '85');
        element.setAttribute('max-score', '100');
        element.setAttribute('label', 'Monthly Performance');
        break;

      // Manufacturing
      case 'erx-machine-status':
        element.setAttribute('machine-name', 'CNC Machine #3');
        element.setAttribute('status', 'running');
        element.setAttribute('efficiency', '87');
        break;

      // Media
      case 'erx-qr-code':
        element.setAttribute('value', 'https://erplora.com');
        break;
      case 'erx-audio-player':
        element.setAttribute('src', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        break;

      // Utilities
      case 'erx-calculator':
        // Calculator doesn't need props
        break;
      case 'erx-code-block':
        element.setAttribute('language', 'javascript');
        element.code = `function hello() {\n  console.log('Hello World!');\n}`;
        break;

      default:
        // No specific props needed
        break;
    }
  }, [componentName]);

  return (
    <div className="example-wrapper">
      <div ref={containerRef}></div>
    </div>
  );
}

function ComponentExample({ componentName }) {
  const DetailedExample = detailedExamples[componentName];

  if (DetailedExample) {
    return <DetailedExample />;
  }

  // Use generic renderer with default props
  return <GenericExample componentName={componentName} />;
}

export default ComponentExample;
