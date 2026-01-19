# ERX Interactive Playground

Interactive testing environment for ERX Web Components with live JSON editing, automated testing, and real-time preview.

## 🚀 Features

- **Live JSON Editor**: Monaco-powered editor with syntax highlighting and auto-formatting
- **Real-time Preview**: See component changes instantly
- **Automated Testing**: Built-in test runner validates component functionality
- **Multiple Presets**: Pre-configured examples for each component
- **Component Documentation**: Props, Events, and Methods tabs
- **Event Monitoring**: Track component events in real-time
- **Method Testing**: Execute component methods interactively
- **Search & Filter**: Quickly find components

## 🌐 Live Demo

Visit the playground at: **https://erplora.github.io/erx/playground/**

## 📦 Local Development

```bash
# Serve locally with any static server
npx serve demo-app

# Or use Python
python -m http.server 8000 -d demo-app

# Or use PHP
php -S localhost:8000 -t demo-app
```

Then open: http://localhost:8000

## 🎯 How to Use

1. **Select a Component**: Choose from the sidebar
2. **Choose a Preset**: Select from dropdown or edit JSON directly
3. **Edit Configuration**: Modify JSON in the Monaco editor
4. **Apply Changes**: Click "Apply JSON" to update the component
5. **Run Tests**: Click "Run Test" to validate functionality
6. **Monitor Events**: Watch the status bar for component events

## 🧪 Test Runner

The playground includes an automated test runner that validates:

- ✅ Component is properly defined
- ✅ Component renders in the DOM
- ✅ Shadow DOM is attached (for shadow components)
- ✅ Required props are settable
- ✅ Public methods are callable
- ✅ Events can be listened to

Tests run automatically when you click "Run Test" button.

## 📝 Component Data Structure

Each component includes:

```javascript
{
  name: 'erx-component-name',
  description: 'Component description',
  props: [
    {
      name: 'propName',
      type: 'string|number|boolean|array|object',
      required: true|false,
      description: 'Prop description'
    }
  ],
  events: [
    {
      name: 'erxEventName',
      description: 'Event description'
    }
  ],
  methods: [
    {
      name: 'methodName',
      description: 'Method description'
    }
  ],
  presets: [
    {
      name: 'Preset Name',
      data: { /* component configuration */ }
    }
  ]
}
```

## 🔧 Adding New Components

To add a new component to the playground:

1. Open `src/components-data.js`
2. Add your component definition following the structure above
3. Include realistic test data in presets
4. Component will automatically appear in the sidebar

## 🎨 Customization

The playground supports:

- Dark/Light themes (coming soon)
- Custom component presets
- Event logging
- Method execution
- Real-time configuration

## 📚 Resources

- [ERX Documentation](https://erplora.github.io/erx/)
- [Component Showcase](https://erplora.github.io/erx/showcase/)
- [GitHub Repository](https://github.com/ERPlora/erx)
- [npm Package](https://www.npmjs.com/package/@erplora/erx)

## 🤝 Contributing

Contributions welcome! To add more component examples:

1. Fork the repository
2. Add component data to `src/components-data.js`
3. Test your changes locally
4. Submit a pull request

## 📄 License

MIT License - Part of the ERPlora project
