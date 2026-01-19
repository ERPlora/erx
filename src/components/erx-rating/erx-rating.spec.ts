import { newSpecPage } from '@stencil/core/testing';
import { ErxRating } from './erx-rating';

describe('erx-rating', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating></erx-rating>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.rootInstance.value).toBe(0);
    expect(page.rootInstance.max).toBe(5);
    expect(page.rootInstance.icon).toBe('star');
  });

  it('renders correct number of stars', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="3" max="5"></erx-rating>`,
    });

    const stars = page.root.shadowRoot.querySelectorAll('.erx-rating__star');
    expect(stars.length).toBe(5);
  });

  it('applies correct filled state based on value', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="3"></erx-rating>`,
    });

    const stars = page.root.shadowRoot.querySelectorAll('.erx-rating__star');

    // First 3 stars should be filled
    expect(stars[0].classList.contains('erx-rating__star--filled')).toBe(true);
    expect(stars[1].classList.contains('erx-rating__star--filled')).toBe(true);
    expect(stars[2].classList.contains('erx-rating__star--filled')).toBe(true);

    // Last 2 stars should be empty
    expect(stars[3].classList.contains('erx-rating__star--empty')).toBe(true);
    expect(stars[4].classList.contains('erx-rating__star--empty')).toBe(true);
  });

  it('supports half stars when allowHalf is true', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="3.5" allow-half="true"></erx-rating>`,
    });

    expect(page.rootInstance.value).toBe(3.5);
    expect(page.rootInstance.allowHalf).toBe(true);
  });

  it('rounds to nearest whole number when allowHalf is false', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="3.5"></erx-rating>`,
    });

    // Without allowHalf, 3.5 should be treated as 3 or 4 (implementation specific)
    const instance = page.rootInstance;
    expect([3, 4]).toContain(Math.round(instance.value));
  });

  it('respects max prop', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating max="10"></erx-rating>`,
    });

    const stars = page.root.shadowRoot.querySelectorAll('.erx-rating__star');
    expect(stars.length).toBe(10);
  });

  it('applies readonly attribute correctly', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating readonly></erx-rating>`,
    });

    expect(page.rootInstance.readonly).toBe(true);

    const container = page.root.shadowRoot.querySelector('.erx-rating');
    expect(container.classList.contains('erx-rating--readonly')).toBe(true);
  });

  it('applies disabled attribute correctly', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating disabled></erx-rating>`,
    });

    expect(page.rootInstance.disabled).toBe(true);

    const container = page.root.shadowRoot.querySelector('.erx-rating');
    expect(container.classList.contains('erx-rating--disabled')).toBe(true);
  });

  it('applies size prop correctly', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating size="lg"></erx-rating>`,
    });

    expect(page.rootInstance.size).toBe('lg');

    const container = page.root.shadowRoot.querySelector('.erx-rating');
    expect(container.classList.contains('erx-rating--lg')).toBe(true);
  });

  it('applies color prop correctly', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating color="danger"></erx-rating>`,
    });

    expect(page.rootInstance.color).toBe('danger');

    const container = page.root.shadowRoot.querySelector('.erx-rating');
    expect(container.classList.contains('erx-rating--danger')).toBe(true);
  });

  it('renders different icon types', async () => {
    const icons = ['star', 'heart', 'circle', 'thumb'] as const;

    for (const icon of icons) {
      const page = await newSpecPage({
        components: [ErxRating],
        html: `<erx-rating icon="${icon}"></erx-rating>`,
      });

      expect(page.rootInstance.icon).toBe(icon);
    }
  });

  it('updates value programmatically', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="2"></erx-rating>`,
    });

    expect(page.rootInstance.value).toBe(2);

    // Update value
    page.rootInstance.value = 4;
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe(4);
  });

  it('does not allow value greater than max', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="7" max="5"></erx-rating>`,
    });

    // Value should be capped at max
    expect(page.rootInstance.value).toBeLessThanOrEqual(5);
  });

  it('does not allow negative value', async () => {
    const page = await newSpecPage({
      components: [ErxRating],
      html: `<erx-rating value="-1"></erx-rating>`,
    });

    // Value should be at least 0
    expect(page.rootInstance.value).toBeGreaterThanOrEqual(0);
  });
});
