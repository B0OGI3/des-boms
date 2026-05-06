import { describe, it, expect, vi } from 'vitest';

vi.mock('../../generated/prisma', () => ({
  PrismaClient: vi.fn(() => ({})),
}));

import {
  getPartTypePrefix,
  validatePartNumber,
  getPartTypeDescription,
} from '../../lib/partNumberGenerator';

describe('getPartTypePrefix', () => {
  it('returns FG for FINISHED', () => {
    expect(getPartTypePrefix('FINISHED')).toBe('FG');
  });

  it('returns SF for SEMI_FINISHED', () => {
    expect(getPartTypePrefix('SEMI_FINISHED')).toBe('SF');
  });

  it('returns RM for RAW_MATERIAL', () => {
    expect(getPartTypePrefix('RAW_MATERIAL')).toBe('RM');
  });

  it('throws for an unknown part type', () => {
    expect(() => getPartTypePrefix('UNKNOWN' as never)).toThrow();
  });
});

describe('validatePartNumber', () => {
  it('accepts a valid FG part number and parses its fields', () => {
    const result = validatePartNumber('FG-2025-0001');
    expect(result.isValid).toBe(true);
    expect(result.partType).toBe('FINISHED');
    expect(result.year).toBe(2025);
    expect(result.sequential).toBe(1);
  });

  it('accepts a valid SF part number', () => {
    const result = validatePartNumber('SF-2025-0042');
    expect(result.isValid).toBe(true);
    expect(result.partType).toBe('SEMI_FINISHED');
  });

  it('accepts a valid RM part number with max sequential', () => {
    const result = validatePartNumber('RM-2024-9999');
    expect(result.isValid).toBe(true);
    expect(result.partType).toBe('RAW_MATERIAL');
    expect(result.sequential).toBe(9999);
  });

  it('rejects an unknown prefix', () => {
    expect(validatePartNumber('XX-2025-0001').isValid).toBe(false);
  });

  it('rejects a 2-digit year', () => {
    expect(validatePartNumber('FG-25-0001').isValid).toBe(false);
  });

  it('rejects a 3-digit sequential number', () => {
    expect(validatePartNumber('FG-2025-001').isValid).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(validatePartNumber('').isValid).toBe(false);
  });
});

describe('getPartTypeDescription', () => {
  it('returns a human-readable label for each type', () => {
    expect(getPartTypeDescription('FINISHED')).toContain('Finished');
    expect(getPartTypeDescription('SEMI_FINISHED')).toContain('Semi-Finished');
    expect(getPartTypeDescription('RAW_MATERIAL')).toContain('Raw Material');
  });

  it('returns a fallback for an unknown type', () => {
    expect(getPartTypeDescription('UNKNOWN' as never)).toBe(
      'Unknown Part Type'
    );
  });
});
