import { newE2EPage } from '@stencil/core/testing';

describe('erx-rating e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating></erx-rating>');

    const element = await page.find('erx-rating');
    expect(element).toHaveClass('hydrated');
  });

  it('displays correct number of stars', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating max="7"></erx-rating>');

    const stars = await page.findAll('erx-rating >>> .erx-rating__star');
    expect(stars.length).toBe(7);
  });

  it('updates value on star click when not readonly', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="2"></erx-rating>');

    const element = await page.find('erx-rating');
    const erxChange = await element.spyOnEvent('erxChange');

    // Click on the 4th star
    const stars = await page.findAll('erx-rating >>> .erx-rating__star');
    await stars[3].click();
    await page.waitForChanges();

    // Event should be emitted
    expect(erxChange).toHaveReceivedEvent();
    expect(erxChange).toHaveReceivedEventDetail({ value: 4 });

    // Value should update
    const value = await element.getProperty('value');
    expect(value).toBe(4);
  });

  it('does not update value when readonly', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="2" readonly></erx-rating>');

    const element = await page.find('erx-rating');
    const erxChange = await element.spyOnEvent('erxChange');

    // Try to click on a star
    const stars = await page.findAll('erx-rating >>> .erx-rating__star');
    await stars[3].click();
    await page.waitForChanges();

    // Event should NOT be emitted
    expect(erxChange).not.toHaveReceivedEvent();

    // Value should remain unchanged
    const value = await element.getProperty('value');
    expect(value).toBe(2);
  });

  it('does not update value when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="2" disabled></erx-rating>');

    const element = await page.find('erx-rating');
    const erxChange = await element.spyOnEvent('erxChange');

    // Try to click on a star
    const stars = await page.findAll('erx-rating >>> .erx-rating__star');
    await stars[3].click();
    await page.waitForChanges();

    // Event should NOT be emitted
    expect(erxChange).not.toHaveReceivedEvent();

    // Value should remain unchanged
    const value = await element.getProperty('value');
    expect(value).toBe(2);
  });

  it('shows hover state on star hover', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="2"></erx-rating>');

    const stars = await page.findAll('erx-rating >>> .erx-rating__star');

    // Hover over 4th star
    await stars[3].hover();
    await page.waitForChanges();

    // Stars 1-4 should have hover state
    for (let i = 0; i < 4; i++) {
      const classes = await stars[i].getProperty('className');
      expect(classes).toContain('erx-rating__star--hover');
    }
  });

  it('supports keyboard navigation', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="2"></erx-rating>');

    const element = await page.find('erx-rating');
    await element.focus();

    // Press right arrow to increase value
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    let value = await element.getProperty('value');
    expect(value).toBe(3);

    // Press left arrow to decrease value
    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();

    value = await element.getProperty('value');
    expect(value).toBe(2);
  });

  it('resets value when clicking same star', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="3"></erx-rating>');

    const element = await page.find('erx-rating');

    // Click on the 3rd star (current value)
    const stars = await page.findAll('erx-rating >>> .erx-rating__star');
    await stars[2].click();
    await page.waitForChanges();

    // Value should reset to 0
    const value = await element.getProperty('value');
    expect(value).toBe(0);
  });

  it('supports half-star selection on hover', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating allow-half="true"></erx-rating>');

    const element = await page.find('erx-rating');

    // Click on left half of 3rd star
    const stars = await page.findAll('erx-rating >>> .erx-rating__star');
    const starBox = await stars[2].boundingBox();

    // Click on left 25% of the star for half-star
    await page.mouse.click(starBox.x + starBox.width * 0.25, starBox.y + starBox.height / 2);
    await page.waitForChanges();

    const value = await element.getProperty('value');
    expect(value).toBe(2.5);
  });

  it('changes icon type dynamically', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating icon="star"></erx-rating>');

    const element = await page.find('erx-rating');

    // Change to heart icon
    element.setProperty('icon', 'heart');
    await page.waitForChanges();

    const icon = await element.getProperty('icon');
    expect(icon).toBe('heart');
  });

  it('applies size classes correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating size="sm"></erx-rating>');

    const container = await page.find('erx-rating >>> .erx-rating');
    expect(await container.getAttribute('class')).toContain('erx-rating--sm');
  });

  it('applies color classes correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating color="success"></erx-rating>');

    const container = await page.find('erx-rating >>> .erx-rating');
    expect(await container.getAttribute('class')).toContain('erx-rating--success');
  });

  it('is accessible with proper ARIA attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<erx-rating value="3" max="5"></erx-rating>');

    const container = await page.find('erx-rating >>> .erx-rating');

    // Should have role
    const role = await container.getAttribute('role');
    expect(role).toBe('slider');

    // Should have aria-valuenow
    const valueNow = await container.getAttribute('aria-valuenow');
    expect(valueNow).toBe('3');

    // Should have aria-valuemax
    const valueMax = await container.getAttribute('aria-valuemax');
    expect(valueMax).toBe('5');

    // Should be focusable
    const tabindex = await container.getAttribute('tabindex');
    expect(tabindex).toBe('0');
  });
});
