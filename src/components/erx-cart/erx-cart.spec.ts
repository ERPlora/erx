import { newSpecPage } from '@stencil/core/testing';
import { ErxCart } from './erx-cart';

describe('erx-cart', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.rootInstance.items).toEqual([]);
    expect(page.rootInstance.taxRate).toBe(0);
    expect(page.rootInstance.currency).toBe('$');
  });

  it('displays empty state when no items', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    const emptyState = page.root.shadowRoot.querySelector('.erx-cart__empty');
    expect(emptyState).toBeTruthy();
  });

  it('renders items correctly', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    page.rootInstance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 2 },
      { id: '2', productId: 'p2', name: 'Product 2', price: 20, quantity: 1 },
    ];
    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll('.erx-cart__item');
    expect(items.length).toBe(2);
  });

  it('calculates summary correctly', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    page.rootInstance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 2 }, // 20
      { id: '2', productId: 'p2', name: 'Product 2', price: 15, quantity: 1 }, // 15
    ];
    await page.waitForChanges();

    const summary = await page.rootInstance.getSummary();
    expect(summary.subtotal).toBe(35);
    expect(summary.itemCount).toBe(3); // 2 + 1
    expect(summary.lineCount).toBe(2);
  });

  it('calculates tax correctly', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart tax-rate="0.21"></erx-cart>`,
    });

    page.rootInstance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 100, quantity: 1 },
    ];
    await page.waitForChanges();

    const summary = await page.rootInstance.getSummary();
    expect(summary.subtotal).toBe(100);
    expect(summary.tax).toBe(21); // 21% of 100
    expect(summary.total).toBe(121);
  });

  it('handles included tax correctly', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart tax-rate="0.21" tax-included="true"></erx-cart>`,
    });

    page.rootInstance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 121, quantity: 1 },
    ];
    await page.waitForChanges();

    const summary = await page.rootInstance.getSummary();
    expect(summary.total).toBe(121); // Total includes tax
    expect(summary.tax).toBeCloseTo(21, 1); // Tax extracted from total
  });

  it('applies item discounts correctly', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    page.rootInstance.items = [
      {
        id: '1',
        productId: 'p1',
        name: 'Product 1',
        price: 100,
        quantity: 1,
        discount: 10,
        discountType: 'percent',
      },
    ];
    await page.waitForChanges();

    const summary = await page.rootInstance.getSummary();
    expect(summary.subtotal).toBe(100);
    expect(summary.discount).toBe(10); // 10% of 100
    expect(summary.total).toBe(90);
  });

  it('applies flat discounts correctly', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    page.rootInstance.items = [
      {
        id: '1',
        productId: 'p1',
        name: 'Product 1',
        price: 100,
        quantity: 2,
        discount: 5,
        discountType: 'flat',
      },
    ];
    await page.waitForChanges();

    const summary = await page.rootInstance.getSummary();
    expect(summary.discount).toBe(10); // $5 * 2 items
  });

  it('adds items to cart via method', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    const instance = page.rootInstance;

    await instance.addItem({
      id: '1',
      productId: 'p1',
      name: 'Product 1',
      price: 10,
      quantity: 1,
    });

    expect(instance.items.length).toBe(1);
    expect(instance.items[0].name).toBe('Product 1');
  });

  it('merges duplicate items when adding', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    const instance = page.rootInstance;

    // Add first item
    await instance.addItem({
      id: '1',
      productId: 'p1',
      name: 'Product 1',
      price: 10,
      quantity: 2,
    });

    // Add same product again
    await instance.addItem({
      id: '2',
      productId: 'p1',
      name: 'Product 1',
      price: 10,
      quantity: 1,
    });

    // Should have 1 item with quantity 3
    expect(instance.items.length).toBe(1);
    expect(instance.items[0].quantity).toBe(3);
  });

  it('removes items from cart', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    const instance = page.rootInstance;

    instance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
      { id: '2', productId: 'p2', name: 'Product 2', price: 20, quantity: 1 },
    ];
    await page.waitForChanges();

    await instance.removeItem('1');

    expect(instance.items.length).toBe(1);
    expect(instance.items[0].id).toBe('2');
  });

  it('updates item quantity', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    const instance = page.rootInstance;

    instance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
    ];
    await page.waitForChanges();

    await instance.updateQuantity('1', 5);

    expect(instance.items[0].quantity).toBe(5);
  });

  it('respects max quantity when updating', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    const instance = page.rootInstance;

    instance.items = [
      {
        id: '1',
        productId: 'p1',
        name: 'Product 1',
        price: 10,
        quantity: 1,
        maxQuantity: 3,
      },
    ];
    await page.waitForChanges();

    await instance.updateQuantity('1', 5);

    // Should cap at maxQuantity
    expect(instance.items[0].quantity).toBe(3);
  });

  it('does not allow quantity less than 1', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    const instance = page.rootInstance;

    instance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 2 },
    ];
    await page.waitForChanges();

    await instance.updateQuantity('1', 0);

    // Should maintain minimum of 1
    expect(instance.items[0].quantity).toBe(1);
  });

  it('clears all items', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart></erx-cart>`,
    });

    const instance = page.rootInstance;

    instance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
      { id: '2', productId: 'p2', name: 'Product 2', price: 20, quantity: 1 },
    ];
    await page.waitForChanges();

    await instance.clear();

    expect(instance.items.length).toBe(0);
  });

  it('hides summary when showSummary is false', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart show-summary="false"></erx-cart>`,
    });

    page.rootInstance.items = [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
    ];
    await page.waitForChanges();

    const summary = page.root.shadowRoot.querySelector('.erx-cart__summary');
    expect(summary).toBeFalsy();
  });

  it('formats prices according to locale', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart currency="€" locale="de-DE"></erx-cart>`,
    });

    expect(page.rootInstance.currency).toBe('€');
    expect(page.rootInstance.locale).toBe('de-DE');
  });

  it('respects disabled state', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart disabled></erx-cart>`,
    });

    const container = page.root.shadowRoot.querySelector('.erx-cart');
    expect(container.classList.contains('erx-cart--disabled')).toBe(true);
  });

  it('respects compact mode', async () => {
    const page = await newSpecPage({
      components: [ErxCart],
      html: `<erx-cart compact></erx-cart>`,
    });

    const container = page.root.shadowRoot.querySelector('.erx-cart');
    expect(container.classList.contains('erx-cart--compact')).toBe(true);
  });
});
