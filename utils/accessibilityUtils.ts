/**
 * Accessibility utility functions
 */

export const handleKeyDown = (
  event: React.KeyboardEvent,
  onEnter?: () => void,
  onEscape?: () => void,
  onSpace?: () => void
) => {
  switch (event.key) {
    case 'Enter':
      if (onEnter) {
        event.preventDefault();
        onEnter();
      }
      break;
    case 'Escape':
      if (onEscape) {
        event.preventDefault();
        onEscape();
      }
      break;
    case ' ':
      if (onSpace) {
        event.preventDefault();
        onSpace();
      }
      break;
  }
};

export const createAriaLabel = (text: string, context?: string): string => {
  return context ? `${text} for ${context}` : text;
};

export const generateId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
};

export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};
