// Keep the keyboard reading position aligned with explicit section navigation.
export function focusSection(target: HTMLElement, behavior: ScrollBehavior = 'instant', focusHeading = true) {
  if (target instanceof HTMLDetailsElement) target.open = true;
  const disclosure = target.closest('details');
  if (disclosure) disclosure.open = true;
  const heading = !focusHeading || target.matches('h1, h2, h3, summary')
    ? target
    : target.querySelector<HTMLElement>('h1, h2, h3, summary') ?? target;
  if (!heading.hasAttribute('tabindex')) {
    heading.setAttribute('tabindex', '-1');
    heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
  }
  target.scrollIntoView({ block: 'start', behavior });
  heading.focus({ preventScroll: true });
}
