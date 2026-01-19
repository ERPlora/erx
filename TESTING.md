# Testing Guide - ERX Components

Este documento explica cómo escribir y ejecutar tests para los componentes ERX.

---

## 📋 Resumen

Los componentes ERX utilizan el framework de testing de Stencil, que incluye:
- **Tests Unitarios** (`.spec.ts`) - Jest con utilidades de Stencil
- **Tests E2E** (`.e2e.ts`) - Puppeteer para tests de integración

---

## 🚀 Configuración Inicial

### Instalar Dependencias de Testing

```bash
npm install --save-dev @types/jest@29 jest@29 jest-cli@29 puppeteer@20
```

### Verificar Configuración

El archivo `stencil.config.ts` ya incluye la configuración de testing:

```typescript
testing: {
  browserHeadless: 'new',
}
```

---

## 📝 Escribir Tests Unitarios

Los tests unitarios verifican la lógica del componente de forma aislada.

### Ubicación

Archivo: `src/components/erx-{name}/erx-{name}.spec.ts`

### Template Básico

```typescript
import { newSpecPage } from '@stencil/core/testing';
import { ErxMyComponent } from './erx-my-component';

describe('erx-my-component', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ErxMyComponent],
      html: `<erx-my-component></erx-my-component>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.rootInstance.myProp).toBe('default');
  });

  it('updates when prop changes', async () => {
    const page = await newSpecPage({
      components: [ErxMyComponent],
      html: `<erx-my-component my-prop="value"></erx-my-component>`,
    });

    expect(page.rootInstance.myProp).toBe('value');

    // Update prop
    page.rootInstance.myProp = 'new-value';
    await page.waitForChanges();

    expect(page.rootInstance.myProp).toBe('new-value');
  });

  it('renders correct DOM structure', async () => {
    const page = await newSpecPage({
      components: [ErxMyComponent],
      html: `<erx-my-component></erx-my-component>`,
    });

    const element = page.root.shadowRoot.querySelector('.my-class');
    expect(element).toBeTruthy();
  });
});
```

### Qué Testear (Unit Tests)

✅ **Renderizado**
- Componente se renderiza correctamente
- Props por defecto están aplicadas
- Estructura DOM es correcta

✅ **Props**
- Props se aplican correctamente
- Valores por defecto funcionan
- Validación de props (min, max, etc.)

✅ **Estado Interno**
- Estado inicial correcto
- Estado se actualiza correctamente
- Cálculos internos son correctos

✅ **Métodos Públicos**
- Métodos públicos (@Method) funcionan
- Retornan valores esperados
- Actualizan estado correctamente

✅ **Clases CSS**
- Clases condicionales se aplican
- Variantes (size, color) funcionan
- Estados (disabled, readonly) se reflejan

---

## 🎭 Escribir Tests E2E

Los tests E2E verifican el comportamiento del componente en un navegador real.

### Ubicación

Archivo: `src/components/erx-{name}/erx-{name}.e2e.ts`

### Template Básico

```typescript
import { newE2EPage } from '@stencil/core/testing';

describe('erx-my-component e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-my-component></erx-my-component>');

    const element = await page.find('erx-my-component');
    expect(element).toHaveClass('hydrated');
  });

  it('emits event on interaction', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-my-component></erx-my-component>');

    const element = await page.find('erx-my-component');
    const myEvent = await element.spyOnEvent('myEvent');

    // Trigger interaction
    const button = await page.find('erx-my-component >>> .my-button');
    await button.click();
    await page.waitForChanges();

    expect(myEvent).toHaveReceivedEvent();
    expect(myEvent).toHaveReceivedEventDetail({ value: 'expected' });
  });

  it('responds to user input', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-my-component></erx-my-component>');

    const input = await page.find('erx-my-component >>> input');
    await input.type('Hello');
    await page.waitForChanges();

    const value = await input.getProperty('value');
    expect(value).toBe('Hello');
  });
});
```

### Qué Testear (E2E Tests)

✅ **Eventos**
- Eventos se emiten correctamente
- Payloads de eventos son correctos
- Eventos se disparan en momento adecuado

✅ **Interacciones de Usuario**
- Clicks funcionan
- Teclado funciona (arrows, enter, escape)
- Hover states se aplican
- Focus states funcionan

✅ **Integración**
- Múltiples componentes interactúan
- Props se actualizan visualmente
- Estados disabled/readonly previenen interacción

✅ **Accesibilidad**
- Atributos ARIA correctos
- Keyboard navigation funciona
- Roles ARIA aplicados
- tabindex correcto

---

## 🎯 Ejemplos Completos

### Ejemplo 1: erx-rating (Unit Test)

```typescript
import { newSpecPage } from '@stencil/core/testing';
import { ErxRating } from './erx-rating';

describe('erx-rating', () => {
  it('renders correct number of stars', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="3" max="5"></erx-rating>`,
    });

    const stars = page.root.shadowRoot.querySelectorAll('.erx-rating__star');
    expect(stars.length).toBe(5);
  });

  it('applies filled state based on value', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="3"></erx-rating>`,
    });

    const stars = page.root.shadowRoot.querySelectorAll('.erx-rating__star');
    expect(stars[0].classList.contains('erx-rating__star--filled')).toBe(true);
    expect(stars[4].classList.contains('erx-rating__star--empty')).toBe(true);
  });

  it('supports half stars', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="3.5" allow-half="true"></erx-rating>`,
    });

    expect(page.rootInstance.value).toBe(3.5);
  });
});
```

### Ejemplo 2: erx-cart (Unit Test)

```typescript
import { newSpecPage } from '@stencil/core/testing';
import { ErxCart } from './erx-cart';

describe('erx-cart', () => {
  it('calculates summary correctly', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    page.rootInstance.items = [
      { id: '1', name: 'Product 1', price: 10, quantity: 2 }, // 20
      { id: '2', name: 'Product 2', price: 15, quantity: 1 }, // 15
    ];
    await page.waitForChanges();

    const summary = await page.rootInstance.getSummary();
    expect(summary.subtotal).toBe(35);
    expect(summary.itemCount).toBe(3);
  });

  it('applies tax correctly', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart tax-rate="0.21"></erx-cart>`,
    });

    page.rootInstance.items = [
      { id: '1', name: 'Product', price: 100, quantity: 1 },
    ];
    await page.waitForChanges();

    const summary = await page.rootInstance.getSummary();
    expect(summary.tax).toBe(21);
    expect(summary.total).toBe(121);
  });
});
```

### Ejemplo 3: erx-rating (E2E Test)

```typescript
import { newE2EPage } from '@stencil/core/testing';

describe('erx-rating e2e', () => {
  it('updates value on star click', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="2"></erx-rating>');

    const element = await page.find('erx-rating');
    const erxChange = await element.spyOnEvent('erxChange');

    // Click on 4th star
    const stars = await page.findAll('erx-rating >>> .erx-rating__star');
    await stars[3].click();
    await page.waitForChanges();

    expect(erxChange).toHaveReceivedEvent();
    expect(erxChange).toHaveReceivedEventDetail({ value: 4 });

    const value = await element.getProperty('value');
    expect(value).toBe(4);
  });

  it('supports keyboard navigation', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="2"></erx-rating>');

    const element = await page.find('erx-rating');
    await element.focus();

    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    const value = await element.getProperty('value');
    expect(value).toBe(3);
  });
});
```

---

## 🏃 Ejecutar Tests

### Todos los Tests

```bash
npm test
```

### Solo Unit Tests

```bash
npm test -- --spec
```

### Solo E2E Tests

```bash
npm test -- --e2e
```

### Tests Específicos

```bash
# Test específico
npm test -- --spec src/components/erx-rating/erx-rating.spec.ts

# Patrón de archivos
npm test -- --spec src/components/erx-rating/**/*.spec.ts
```

### Watch Mode

```bash
npm run test:watch
```

### Con Coverage

```bash
npm test -- --coverage
```

---

## 📊 Coverage

Para generar reporte de cobertura:

```bash
npm test -- --coverage
```

Objetivo de cobertura:
- **Statements**: >80%
- **Branches**: >75%
- **Functions**: >80%
- **Lines**: >80%

---

## 🎯 Mejores Prácticas

### 1. Nombres Descriptivos

```typescript
// ❌ Malo
it('test1', async () => { ... });

// ✅ Bueno
it('calculates total with tax correctly', async () => { ... });
```

### 2. Un Concepto por Test

```typescript
// ❌ Malo - testing múltiples cosas
it('works', async () => {
  expect(component.value).toBe(0);
  expect(component.max).toBe(5);
  expect(component.disabled).toBe(false);
  // ...
});

// ✅ Bueno - un test por concepto
it('has default value of 0', async () => {
  expect(component.value).toBe(0);
});

it('has default max of 5', async () => {
  expect(component.max).toBe(5);
});
```

### 3. Arrange-Act-Assert

```typescript
it('increases quantity when + button clicked', async () => {
  // Arrange
  const page = await newE2EPage();
  await page.setContent('<erx-cart></erx-cart>');
  await element.setProperty('items', [{ quantity: 2 }]);

  // Act
  const button = await page.find('erx-cart >>> .increase-btn');
  await button.click();
  await page.waitForChanges();

  // Assert
  const items = await element.getProperty('items');
  expect(items[0].quantity).toBe(3);
});
```

### 4. Cleanup

```typescript
describe('erx-my-component', () => {
  let page;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  afterEach(async () => {
    await page.close();
  });

  it('test case', async () => {
    // Test implementation
  });
});
```

---

## 🐛 Debugging Tests

### Ver Tests en Navegador

```bash
npm test -- --e2e --devtools
```

### Pausar Ejecución

```typescript
it('test with breakpoint', async () => {
  const page = await newE2EPage();
  await page.setContent('<erx-rating></erx-rating>');

  // Pausar aquí
  await jestPuppeteer.debug();

  // Continúa después de inspección
  const element = await page.find('erx-rating');
  expect(element).toBeTruthy();
});
```

### Screenshots en E2E

```typescript
it('takes screenshot', async () => {
  const page = await newE2EPage();
  await page.setContent('<erx-rating value="4"></erx-rating>');

  await page.screenshot({ path: 'test-screenshot.png' });
});
```

---

## 📚 Recursos

- [Stencil Testing Docs](https://stenciljs.com/docs/testing-overview)
- [Jest API](https://jestjs.io/docs/api)
- [Puppeteer API](https://pptr.dev/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

## ✅ Checklist de Testing

Antes de considerar un componente completo:

- [ ] Tests unitarios creados (`.spec.ts`)
- [ ] Tests E2E creados (`.e2e.ts`)
- [ ] Renderizado básico testeado
- [ ] Props testeadas
- [ ] Eventos testeados
- [ ] Interacciones de usuario testeadas
- [ ] Edge cases cubiertos (empty, max, min, etc.)
- [ ] Estados especiales testeados (disabled, readonly)
- [ ] Accesibilidad verificada (ARIA, keyboard)
- [ ] Coverage >80%

---

## 📝 Estado Actual

### Componentes con Tests

- ✅ `erx-rating` - Unit + E2E completos
- ✅ `erx-cart` - Unit + E2E completos

### Componentes Pendientes (92 componentes)

Los siguientes componentes necesitan tests:
- `erx-product-card`
- `erx-calculator`
- `erx-payment`
- `erx-data-grid`
- ... (87 más)

### Próximos Pasos

1. Instalar dependencias de testing
2. Configurar CI/CD para ejecutar tests automáticamente
3. Añadir tests a componentes críticos:
   - POS components (alta prioridad)
   - Form components
   - Data display components
4. Establecer threshold de coverage mínimo
5. Documentar casos edge específicos por componente

---

**Última actualización:** 2026-01-19
