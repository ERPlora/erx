import { newE2EPage } from '@stencil/core/testing';

describe('erx-cart e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');
    expect(element).toHaveClass('hydrated');
  });

  it('shows empty state initially', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const emptyState = await page.find('erx-cart >>> .erx-cart__empty');
    expect(emptyState).toBeTruthy();
  });

  it('displays items when added', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');

    // Add items
    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
      { id: '2', productId: 'p2', name: 'Product 2', price: 20, quantity: 2 },
    ]);
    await page.waitForChanges();

    const items = await page.findAll('erx-cart >>> .erx-cart__item');
    expect(items.length).toBe(2);
  });

  it('increases quantity when + button clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 2 },
    ]);
    await page.waitForChanges();

    // Find and click + button
    const increaseBtn = await page.find('erx-cart >>> .erx-cart__qty-btn:last-of-type');
    await increaseBtn.click();
    await page.waitForChanges();

    // Check updated quantity
    const items = await element.getProperty('items');
    expect(items[0].quantity).toBe(3);
  });

  it('decreases quantity when - button clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 3 },
    ]);
    await page.waitForChanges();

    // Find and click - button
    const decreaseBtn = await page.find('erx-cart >>> .erx-cart__qty-btn:first-of-type');
    await decreaseBtn.click();
    await page.waitForChanges();

    // Check updated quantity
    const items = await element.getProperty('items');
    expect(items[0].quantity).toBe(2);
  });

  it('does not decrease quantity below 1', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
    ]);
    await page.waitForChanges();

    // - button should be disabled
    const decreaseBtn = await page.find('erx-cart >>> .erx-cart__qty-btn:first-of-type');
    const isDisabled = await decreaseBtn.getProperty('disabled');
    expect(isDisabled).toBe(true);
  });

  it('emits erxItemChange event when quantity changes', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');
    const erxItemChange = await element.spyOnEvent('erxItemChange');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 2 },
    ]);
    await page.waitForChanges();

    // Click + button
    const increaseBtn = await page.find('erx-cart >>> .erx-cart__qty-btn:last-of-type');
    await increaseBtn.click();
    await page.waitForChanges();

    expect(erxItemChange).toHaveReceivedEvent();
    expect(erxItemChange).toHaveReceivedEventDetail({
      item: expect.objectContaining({ quantity: 3 }),
      quantity: 3,
      previousQuantity: 2,
    });
  });

  it('removes item when remove button clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
      { id: '2', productId: 'p2', name: 'Product 2', price: 20, quantity: 1 },
    ]);
    await page.waitForChanges();

    // Click remove button on first item
    const removeBtn = await page.find('erx-cart >>> .erx-cart__item-remove');
    await removeBtn.click();
    await page.waitForChanges();

    const items = await element.getProperty('items');
    expect(items.length).toBe(1);
  });

  it('emits erxItemRemove event when item removed', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');
    const erxItemRemove = await element.spyOnEvent('erxItemRemove');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
    ]);
    await page.waitForChanges();

    const removeBtn = await page.find('erx-cart >>> .erx-cart__item-remove');
    await removeBtn.click();
    await page.waitForChanges();

    expect(erxItemRemove).toHaveReceivedEvent();
  });

  it('clears all items when clear button clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
      { id: '2', productId: 'p2', name: 'Product 2', price: 20, quantity: 1 },
    ]);
    await page.waitForChanges();

    const clearBtn = await page.find('erx-cart >>> .erx-cart__clear-btn');
    await clearBtn.click();
    await page.waitForChanges();

    const items = await element.getProperty('items');
    expect(items.length).toBe(0);
  });

  it('emits erxClear event when cleared', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');
    const erxClear = await element.spyOnEvent('erxClear');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
    ]);
    await page.waitForChanges();

    const clearBtn = await page.find('erx-cart >>> .erx-cart__clear-btn');
    await clearBtn.click();
    await page.waitForChanges();

    expect(erxClear).toHaveReceivedEvent();
  });

  it('emits erxCheckout event when checkout button clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');
    const erxCheckout = await element.spyOnEvent('erxCheckout');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 1 },
    ]);
    await page.waitForChanges();

    const checkoutBtn = await page.find('erx-cart >>> .erx-cart__checkout-btn');
    await checkoutBtn.click();
    await page.waitForChanges();

    expect(erxCheckout).toHaveReceivedEvent();
    expect(erxCheckout).toHaveReceivedEventDetail({
      summary: expect.objectContaining({ total: expect.any(Number) }),
      items: expect.any(Array),
    });
  });

  it('displays summary with correct totals', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart tax-rate="0.21"></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 100, quantity: 1 },
    ]);
    await page.waitForChanges();

    const summaryRows = await page.findAll('erx-cart >>> .erx-cart__summary-row');
    expect(summaryRows.length).toBeGreaterThan(0);

    // Check subtotal
    const subtotalText = await summaryRows[0].innerText;
    expect(subtotalText).toContain('100');

    // Check total
    const totalRow = await page.find('erx-cart >>> .erx-cart__summary-row--total');
    const totalText = await totalRow.innerText;
    expect(totalText).toContain('121'); // 100 + 21% tax
  });

  it('respects disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart disabled></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      { id: '1', productId: 'p1', name: 'Product 1', price: 10, quantity: 2 },
    ]);
    await page.waitForChanges();

    // All buttons should be disabled
    const increaseBtn = await page.find('erx-cart >>> .erx-cart__qty-btn:last-of-type');
    const isDisabled = await increaseBtn.getProperty('disabled');
    expect(isDisabled).toBe(true);
  });

  it('shows item images when available', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      {
        id: '1',
        productId: 'p1',
        name: 'Product 1',
        price: 10,
        quantity: 1,
        image: 'https://via.placeholder.com/60',
      },
    ]);
    await page.waitForChanges();

    const image = await page.find('erx-cart >>> .erx-cart__item-image img');
    expect(image).toBeTruthy();
    expect(await image.getAttribute('src')).toBe('https://via.placeholder.com/60');
  });

  it('displays discount badge when item has discount', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-cart></erx-cart>');

    const element = await page.find('erx-cart');

    await element.setProperty('items', [
      {
        id: '1',
        productId: 'p1',
        name: 'Product 1',
        price: 100,
        quantity: 1,
        discount: 10,
        discountType: 'percent',
      },
    ]);
    await page.waitForChanges();

    const discount = await page.find('erx-cart >>> .erx-cart__item-discount');
    expect(discount).toBeTruthy();
    const discountText = await discount.innerText;
    expect(discountText).toContain('10%');
  });
});
