import { vi } from 'vitest';

const handler = { get: (_: object, prop: string) => makeMockModel(prop) };

function makeMockModel(_name: string) {
  return new Proxy(
    {},
    {
      get: () =>
        vi.fn().mockResolvedValue(undefined),
    },
  );
}

export function createPrismaMock() {
  return new Proxy({} as Record<string, unknown>, handler) as Record<
    string,
    Record<string, ReturnType<typeof vi.fn>>
  >;
}
