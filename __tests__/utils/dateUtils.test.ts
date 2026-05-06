import { describe, it, expect } from 'vitest';
import {
  isOverdue,
  getDaysUntilDue,
  getUrgencyColor,
} from '../../utils/dateUtils';

describe('isOverdue', () => {
  it('returns true for a date in the past', () => {
    expect(isOverdue('2020-01-01')).toBe(true);
  });

  it('returns false for a date far in the future', () => {
    expect(isOverdue('2099-12-31')).toBe(false);
  });
});

describe('getDaysUntilDue', () => {
  it('returns a negative number for past dates', () => {
    expect(getDaysUntilDue('2020-01-01')).toBeLessThan(0);
  });

  it('returns a positive number for future dates', () => {
    expect(getDaysUntilDue('2099-12-31')).toBeGreaterThan(0);
  });
});

describe('getUrgencyColor', () => {
  it('returns red for overdue (negative days)', () => {
    expect(getUrgencyColor(-1)).toBe('#ef4444');
    expect(getUrgencyColor(-30)).toBe('#ef4444');
  });

  it('returns orange for due today or within 2 days', () => {
    expect(getUrgencyColor(0)).toBe('#f97316');
    expect(getUrgencyColor(1)).toBe('#f97316');
    expect(getUrgencyColor(2)).toBe('#f97316');
  });

  it('returns yellow for 3–7 days out', () => {
    expect(getUrgencyColor(3)).toBe('#eab308');
    expect(getUrgencyColor(7)).toBe('#eab308');
  });

  it('returns green for 8+ days out', () => {
    expect(getUrgencyColor(8)).toBe('#10b981');
    expect(getUrgencyColor(30)).toBe('#10b981');
  });
});
