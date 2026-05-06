import { describe, it, expect, vi } from 'vitest';

vi.mock('../../generated/prisma', () => ({
  PrismaClient: vi.fn(() => ({})),
}));

import { validateBOMHierarchy } from '../../lib/bomUtils';

describe('validateBOMHierarchy', () => {
  describe('Finished Goods (FG)', () => {
    it('can contain Semi-Finished parts', () => {
      expect(validateBOMHierarchy('FINISHED', 'SEMI_FINISHED').valid).toBe(
        true
      );
    });

    it('can contain Raw Materials', () => {
      expect(validateBOMHierarchy('FINISHED', 'RAW_MATERIAL').valid).toBe(true);
    });

    it('cannot contain other Finished Goods', () => {
      const result = validateBOMHierarchy('FINISHED', 'FINISHED');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Semi-Finished parts (SF)', () => {
    it('can contain Raw Materials', () => {
      expect(validateBOMHierarchy('SEMI_FINISHED', 'RAW_MATERIAL').valid).toBe(
        true
      );
    });

    it('cannot contain other Semi-Finished parts', () => {
      const result = validateBOMHierarchy('SEMI_FINISHED', 'SEMI_FINISHED');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('cannot contain Finished Goods', () => {
      expect(validateBOMHierarchy('SEMI_FINISHED', 'FINISHED').valid).toBe(
        false
      );
    });
  });

  describe('Raw Materials (RM)', () => {
    it('cannot contain Raw Materials', () => {
      const result = validateBOMHierarchy('RAW_MATERIAL', 'RAW_MATERIAL');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('cannot contain Semi-Finished parts', () => {
      expect(validateBOMHierarchy('RAW_MATERIAL', 'SEMI_FINISHED').valid).toBe(
        false
      );
    });

    it('cannot contain Finished Goods', () => {
      expect(validateBOMHierarchy('RAW_MATERIAL', 'FINISHED').valid).toBe(
        false
      );
    });
  });
});
