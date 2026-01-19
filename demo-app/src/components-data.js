export const components = [
  {
    name: 'erx-cart',
    description: 'Shopping cart component with item management',
    props: [
      { name: 'items', type: 'array', required: true, description: 'Cart items array' },
      { name: 'taxRate', type: 'number', required: false, description: 'Tax rate (decimal, e.g., 0.21 for 21%)' },
      { name: 'taxLabel', type: 'string', required: false, description: 'Tax label text' },
      { name: 'currency', type: 'string', required: false, description: 'Currency symbol' },
      { name: 'compact', type: 'boolean', required: false, description: 'Compact display mode' }
    ],
    events: [
      { name: 'erxItemChange', description: 'Emitted when item quantity changes' },
      { name: 'erxItemRemove', description: 'Emitted when item is removed' },
      { name: 'erxCheckout', description: 'Emitted when checkout is clicked' },
      { name: 'erxClear', description: 'Emitted when cart is cleared' }
    ],
    methods: [
      { name: 'addItem', description: 'Add item to cart' },
      { name: 'removeItem', description: 'Remove item from cart' },
      { name: 'clear', description: 'Clear all items' },
      { name: 'getSummary', description: 'Get cart summary' }
    ],
    presets: [
      {
        name: 'Empty Cart',
        data: { items: [], taxRate: 0.21, currency: '$' }
      },
      {
        name: 'Basic Cart',
        data: {
          items: [
            { id: '1', productId: 'prod-1', name: 'Wireless Mouse', price: 29.99, quantity: 2, image: 'https://picsum.photos/seed/mouse/60/60' },
            { id: '2', productId: 'prod-2', name: 'Mechanical Keyboard', price: 89.99, quantity: 1, image: 'https://picsum.photos/seed/keyboard/60/60' }
          ],
          taxRate: 0.21,
          currency: '$'
        }
      },
      {
        name: 'Full Cart',
        data: {
          items: [
            { id: '1', productId: 'prod-1', name: 'Wireless Mouse', price: 29.99, quantity: 2, image: 'https://picsum.photos/seed/mouse/60/60' },
            { id: '2', productId: 'prod-2', name: 'Mechanical Keyboard', price: 89.99, quantity: 1, image: 'https://picsum.photos/seed/keyboard/60/60' },
            { id: '3', productId: 'prod-3', name: 'USB-C Cable', price: 12.99, quantity: 3, image: 'https://picsum.photos/seed/cable/60/60' },
            { id: '4', productId: 'prod-4', name: 'Monitor Stand', price: 49.99, quantity: 1, image: 'https://picsum.photos/seed/stand/60/60' }
          ],
          taxRate: 0.21,
          taxLabel: 'IVA',
          currency: '€'
        }
      }
    ]
  },
  {
    name: 'erx-data-grid',
    description: 'Full-featured data grid with sorting, filtering, and pagination',
    props: [
      { name: 'data', type: 'array', required: true, description: 'Row data array' },
      { name: 'columns', type: 'array', required: true, description: 'Column definitions' },
      { name: 'selectable', type: 'string|boolean', required: false, description: 'Enable row selection (false, "single", "multiple")' },
      { name: 'sortable', type: 'boolean', required: false, description: 'Enable column sorting' },
      { name: 'filterable', type: 'boolean', required: false, description: 'Enable column filtering' },
      { name: 'paginate', type: 'boolean', required: false, description: 'Enable pagination' },
      { name: 'pageSize', type: 'number', required: false, description: 'Rows per page' }
    ],
    events: [
      { name: 'erxSort', description: 'Emitted when sort changes' },
      { name: 'erxFilter', description: 'Emitted when filters change' },
      { name: 'erxRowSelect', description: 'Emitted when row selection changes' },
      { name: 'erxRowClick', description: 'Emitted when a row is clicked' }
    ],
    methods: [
      { name: 'selectAll', description: 'Select all visible rows' },
      { name: 'clearSelection', description: 'Clear all selections' },
      { name: 'exportToCSV', description: 'Export data to CSV' },
      { name: 'refresh', description: 'Refresh the grid' }
    ],
    presets: [
      {
        name: 'Simple Table',
        data: {
          columns: [
            { field: 'id', header: 'ID', width: 80 },
            { field: 'name', header: 'Name', sortable: true },
            { field: 'email', header: 'Email', sortable: true },
            { field: 'role', header: 'Role' }
          ],
          data: [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' }
          ],
          sortable: true
        }
      },
      {
        name: 'Full Featured',
        data: {
          columns: [
            { field: 'id', header: 'ID', width: 80, sortable: true },
            { field: 'product', header: 'Product', sortable: true, filterable: true },
            { field: 'category', header: 'Category', sortable: true },
            { field: 'price', header: 'Price', type: 'currency', sortable: true, align: 'right' },
            { field: 'stock', header: 'Stock', type: 'number', sortable: true, align: 'center' },
            { field: 'status', header: 'Status', sortable: true }
          ],
          data: [
            { id: 1, product: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45, status: 'In Stock' },
            { id: 2, product: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 120, status: 'In Stock' },
            { id: 3, product: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 0, status: 'Out of Stock' },
            { id: 4, product: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 15, status: 'Low Stock' },
            { id: 5, product: 'Keyboard Mechanical', category: 'Accessories', price: 89.99, stock: 67, status: 'In Stock' }
          ],
          selectable: 'multiple',
          sortable: true,
          filterable: true,
          paginate: true,
          pageSize: 10
        }
      }
    ]
  },
  {
    name: 'erx-product-card',
    description: 'Product display card for POS systems',
    props: [
      { name: 'product', type: 'object', required: true, description: 'Product data' },
      { name: 'showStock', type: 'boolean', required: false, description: 'Show stock indicator' },
      { name: 'compact', type: 'boolean', required: false, description: 'Compact mode' },
      { name: 'currency', type: 'string', required: false, description: 'Currency symbol' }
    ],
    events: [
      { name: 'erxSelect', description: 'Emitted when product is selected' },
      { name: 'erxAddToCart', description: 'Emitted when add to cart is clicked' }
    ],
    methods: [],
    presets: [
      {
        name: 'Basic Product',
        data: {
          product: {
            id: 'prod-1',
            name: 'Wireless Mouse',
            price: 29.99,
            image: 'https://picsum.photos/seed/mouse/200/200',
            category: 'Electronics'
          },
          currency: '$'
        }
      },
      {
        name: 'With Stock',
        data: {
          product: {
            id: 'prod-2',
            name: 'Mechanical Keyboard',
            price: 89.99,
            image: 'https://picsum.photos/seed/keyboard/200/200',
            stock: 15,
            category: 'Electronics'
          },
          showStock: true,
          currency: '$'
        }
      },
      {
        name: 'Out of Stock',
        data: {
          product: {
            id: 'prod-3',
            name: 'USB-C Hub',
            price: 49.99,
            image: 'https://picsum.photos/seed/hub/200/200',
            stock: 0,
            category: 'Accessories'
          },
          showStock: true,
          currency: '$'
        }
      }
    ]
  },
  {
    name: 'erx-payment',
    description: 'Payment processing interface',
    props: [
      { name: 'amount', type: 'number', required: true, description: 'Payment amount' },
      { name: 'currency', type: 'string', required: false, description: 'Currency symbol' },
      { name: 'methods', type: 'array', required: false, description: 'Available payment methods' },
      { name: 'showChange', type: 'boolean', required: false, description: 'Show change calculation' }
    ],
    events: [
      { name: 'erxComplete', description: 'Payment completed' },
      { name: 'erxCancel', description: 'Payment cancelled' },
      { name: 'erxMethodChange', description: 'Payment method changed' }
    ],
    methods: [
      { name: 'reset', description: 'Reset payment form' },
      { name: 'setAmount', description: 'Set payment amount' }
    ],
    presets: [
      {
        name: 'Basic Payment',
        data: {
          amount: 125.50,
          currency: '$',
          methods: ['cash', 'card', 'mobile']
        }
      },
      {
        name: 'With Change',
        data: {
          amount: 87.25,
          currency: '€',
          methods: ['cash', 'card', 'mobile', 'check'],
          showChange: true
        }
      }
    ]
  },
  {
    name: 'erx-calendar',
    description: 'Interactive calendar with events',
    props: [
      { name: 'events', type: 'array', required: false, description: 'Calendar events' },
      { name: 'view', type: 'string', required: false, description: 'Calendar view (month, week, day)' },
      { name: 'selectedDate', type: 'string', required: false, description: 'Selected date (ISO format)' }
    ],
    events: [
      { name: 'erxDateSelect', description: 'Date selected' },
      { name: 'erxEventClick', description: 'Event clicked' },
      { name: 'erxViewChange', description: 'View changed' }
    ],
    methods: [
      { name: 'goToDate', description: 'Navigate to specific date' },
      { name: 'nextMonth', description: 'Go to next month' },
      { name: 'prevMonth', description: 'Go to previous month' }
    ],
    presets: [
      {
        name: 'Empty Calendar',
        data: {
          view: 'month',
          selectedDate: new Date().toISOString()
        }
      },
      {
        name: 'With Events',
        data: {
          events: [
            { id: '1', title: 'Team Meeting', start: '2024-01-15T10:00:00', end: '2024-01-15T11:00:00', color: '#667eea' },
            { id: '2', title: 'Project Deadline', start: '2024-01-20T00:00:00', end: '2024-01-20T23:59:59', color: '#ef4444' },
            { id: '3', title: 'Client Call', start: '2024-01-18T14:00:00', end: '2024-01-18T15:00:00', color: '#10b981' }
          ],
          view: 'month',
          selectedDate: '2024-01-15T00:00:00'
        }
      }
    ]
  },
  {
    name: 'erx-kanban',
    description: 'Drag-and-drop Kanban board',
    props: [
      { name: 'columns', type: 'array', required: true, description: 'Kanban columns' },
      { name: 'cards', type: 'array', required: true, description: 'Kanban cards' },
      { name: 'draggable', type: 'boolean', required: false, description: 'Enable drag and drop' }
    ],
    events: [
      { name: 'erxCardMove', description: 'Card moved between columns' },
      { name: 'erxCardClick', description: 'Card clicked' },
      { name: 'erxColumnChange', description: 'Column changed' }
    ],
    methods: [
      { name: 'addCard', description: 'Add new card' },
      { name: 'removeCard', description: 'Remove card' },
      { name: 'moveCard', description: 'Move card to column' }
    ],
    presets: [
      {
        name: 'Project Board',
        data: {
          columns: [
            { id: 'todo', title: 'To Do', color: '#94a3b8' },
            { id: 'progress', title: 'In Progress', color: '#f59e0b' },
            { id: 'review', title: 'Review', color: '#8b5cf6' },
            { id: 'done', title: 'Done', color: '#10b981' }
          ],
          cards: [
            { id: '1', columnId: 'todo', title: 'Design new feature', description: 'Create mockups', priority: 'high' },
            { id: '2', columnId: 'todo', title: 'Update documentation', priority: 'low' },
            { id: '3', columnId: 'progress', title: 'Implement API endpoint', assignee: 'John', priority: 'high' },
            { id: '4', columnId: 'review', title: 'Fix bug #123', assignee: 'Jane', priority: 'medium' },
            { id: '5', columnId: 'done', title: 'Setup CI/CD', priority: 'medium' }
          ],
          draggable: true
        }
      }
    ]
  },
  {
    name: 'erx-signature-pad',
    description: 'Touch-enabled signature capture',
    props: [
      { name: 'width', type: 'number', required: false, description: 'Canvas width' },
      { name: 'height', type: 'number', required: false, description: 'Canvas height' },
      { name: 'penColor', type: 'string', required: false, description: 'Pen color' },
      { name: 'backgroundColor', type: 'string', required: false, description: 'Background color' }
    ],
    events: [
      { name: 'erxChange', description: 'Signature changed' },
      { name: 'erxClear', description: 'Signature cleared' }
    ],
    methods: [
      { name: 'clear', description: 'Clear signature' },
      { name: 'toDataURL', description: 'Get signature as data URL' },
      { name: 'isEmpty', description: 'Check if signature is empty' }
    ],
    presets: [
      {
        name: 'Default',
        data: {
          width: 400,
          height: 200,
          penColor: '#000000',
          backgroundColor: '#ffffff'
        }
      },
      {
        name: 'Custom Colors',
        data: {
          width: 500,
          height: 250,
          penColor: '#667eea',
          backgroundColor: '#f8fafc'
        }
      }
    ]
  },
  {
    name: 'erx-chart',
    description: 'Versatile charting component',
    props: [
      { name: 'type', type: 'string', required: true, description: 'Chart type (line, bar, pie, etc.)' },
      { name: 'data', type: 'object', required: true, description: 'Chart data' },
      { name: 'options', type: 'object', required: false, description: 'Chart options' }
    ],
    events: [
      { name: 'erxClick', description: 'Chart element clicked' },
      { name: 'erxHover', description: 'Chart element hovered' }
    ],
    methods: [
      { name: 'update', description: 'Update chart data' },
      { name: 'destroy', description: 'Destroy chart instance' }
    ],
    presets: [
      {
        name: 'Line Chart',
        data: {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Sales 2024',
              data: [12, 19, 3, 5, 2, 3],
              borderColor: '#667eea',
              tension: 0.4
            }]
          }
        }
      },
      {
        name: 'Bar Chart',
        data: {
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
              label: 'Revenue',
              data: [65, 59, 80, 81],
              backgroundColor: '#667eea'
            }]
          }
        }
      }
    ]
  },
  {
    name: 'erx-time-clock',
    description: 'Employee time clock widget',
    props: [
      { name: 'employee', type: 'object', required: false, description: 'Employee data' },
      { name: 'status', type: 'string', required: false, description: 'Clock status (in, out, break)' }
    ],
    events: [
      { name: 'erxClockIn', description: 'Employee clocked in' },
      { name: 'erxClockOut', description: 'Employee clocked out' },
      { name: 'erxBreak', description: 'Break started/ended' }
    ],
    methods: [
      { name: 'clockIn', description: 'Clock in employee' },
      { name: 'clockOut', description: 'Clock out employee' }
    ],
    presets: [
      {
        name: 'Clocked Out',
        data: {
          employee: { id: '123', name: 'John Doe', department: 'Sales' },
          status: 'out'
        }
      },
      {
        name: 'Clocked In',
        data: {
          employee: { id: '123', name: 'John Doe', department: 'Sales' },
          status: 'in'
        }
      }
    ]
  },
  {
    name: 'erx-pin-pad',
    description: 'PIN entry pad for authentication',
    props: [
      { name: 'length', type: 'number', required: false, description: 'PIN length' },
      { name: 'masked', type: 'boolean', required: false, description: 'Show masked input' }
    ],
    events: [
      { name: 'erxComplete', description: 'PIN entry complete' },
      { name: 'erxChange', description: 'PIN value changed' },
      { name: 'erxClear', description: 'PIN cleared' }
    ],
    methods: [
      { name: 'clear', description: 'Clear PIN' },
      { name: 'getValue', description: 'Get current PIN value' }
    ],
    presets: [
      {
        name: '4-Digit PIN',
        data: { length: 4, masked: true }
      },
      {
        name: '6-Digit PIN',
        data: { length: 6, masked: true }
      }
    ]
  }
];
