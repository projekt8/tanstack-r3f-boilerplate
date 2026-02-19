import { describe, expect, it } from 'vitest';

describe('Smoke test', () => {
  it('loads the root route module without errors', async () => {
    const mod = await import('@/routes/__root');
    expect(mod.Route).toBeDefined();
  });

  it('loads the index route module without errors', async () => {
    const mod = await import('@/routes/index');
    expect(mod.Route).toBeDefined();
  });
});
