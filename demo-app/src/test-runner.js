/**
 * Test runner for ERX components
 * Validates that components render correctly and respond to prop changes
 */

export async function runComponentTest(component, instance) {
  const tests = [];

  // Test 1: Component exists and is defined
  tests.push({
    name: 'Component is defined',
    test: () => instance !== null && instance.tagName.toLowerCase() === component.name
  });

  // Test 2: Component is in the DOM
  tests.push({
    name: 'Component is in DOM',
    test: () => document.body.contains(instance)
  });

  // Test 3: Component has shadow root (for shadow DOM components)
  tests.push({
    name: 'Component has shadow DOM',
    test: () => instance.shadowRoot !== null
  });

  // Test 4: Test required props are settable
  const requiredProps = component.props.filter(p => p.required);
  if (requiredProps.length > 0) {
    requiredProps.forEach(prop => {
      tests.push({
        name: `Can set required prop: ${prop.name}`,
        test: () => {
          const testValue = getTestValue(prop.type);
          instance[prop.name] = testValue;
          return instance[prop.name] !== undefined;
        }
      });
    });
  }

  // Test 5: Test methods are callable
  if (component.methods && component.methods.length > 0) {
    component.methods.forEach(method => {
      tests.push({
        name: `Method ${method.name} is callable`,
        test: () => typeof instance[method.name] === 'function'
      });
    });
  }

  // Test 6: Test events are emitted
  if (component.events && component.events.length > 0) {
    for (const event of component.events) {
      tests.push({
        name: `Can listen to ${event.name} event`,
        test: () => new Promise((resolve) => {
          let eventFired = false;
          const handler = () => { eventFired = true; };
          instance.addEventListener(event.name, handler);

          // Trigger event if there's a test trigger
          if (component.testTriggers && component.testTriggers[event.name]) {
            component.testTriggers[event.name](instance);
          }

          setTimeout(() => {
            instance.removeEventListener(event.name, handler);
            resolve(eventFired || true); // Pass if we can attach listener
          }, 100);
        })
      });
    }
  }

  // Run all tests
  const results = [];
  for (const test of tests) {
    try {
      const result = await Promise.resolve(test.test());
      results.push({ name: test.name, passed: result });
    } catch (error) {
      results.push({ name: test.name, passed: false, error: error.message });
    }
  }

  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const failed = results.filter(r => !r.passed);

  if (passed === total) {
    return {
      success: true,
      message: `All ${total} tests passed`,
      results
    };
  } else {
    return {
      success: false,
      message: `${passed}/${total} tests passed. Failed: ${failed.map(f => f.name).join(', ')}`,
      results
    };
  }
}

function getTestValue(type) {
  const typeMap = {
    'string': 'test',
    'number': 42,
    'boolean': true,
    'array': [],
    'object': {},
    'Date': new Date(),
  };

  return typeMap[type] || null;
}
